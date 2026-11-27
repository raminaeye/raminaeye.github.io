/* wt-sw.js: offline walkthrough playback for raminaeye.github.io.
   Registered by walkthrough-player.js. Vanilla JS, no dependencies,
   no imports. The worker caches a walkthrough audio on first play
   plus the page and player files, and serves them offline. It never
   caches a partial response, and it never wipes saved audio on its
   own update: cache names change only when the stored format changes. */
'use strict';

var WT_SW_VERSION = 'wt-sw-3';
var AUDIO_CACHE = 'wt-audio-v1';
var STATIC_CACHE = 'wt-static-v1';
var MUSIC_CACHE = 'wt-music-v1';
var AUDIO_MAX_FILES = 8;
var AUDIO_MAX_BYTES = 200 * 1024 * 1024;
var MUSIC_MAX_FILES = 9;
var MUSIC_MAX_BYTES = 60 * 1024 * 1024;
var STATIC_MAX_BYTES = 20 * 1024 * 1024;
var DB_NAME = 'wt-meta';
var DB_STORE = 'audio';
var OFFLINE_AUDIO_TEXT = 'Walkthrough audio is not saved on this device.';

/* URLs with a background full fetch already running, so a second range
   request for the same walkthrough does not start a second download. */
var inFlight = new Map();

/* ---------- routing ---------- */

function isWalkthroughAudio(url) {
  return /^\/podcasts\/[^/]+-walkthrough\.mp3$/.test(url.pathname);
}

/* Background music tracks live under /podcasts/music/. They are
   small (about 4.3 MB each, nine files) and route through the same
   audio handler as walkthroughs, but into their own cache, so music
   never evicts a saved walkthrough and walkthroughs never evict
   music. */
function isMusicAudio(url) {
  return /^\/podcasts\/music\/[^/]+\.mp3$/.test(url.pathname);
}

var STATIC_BASENAMES = [
  'walkthrough-player.js',
  'podcast-player.js',
  'tutorial-nav.js',
  'site.css',
  'site-math.js'
];

function isStatic(request, url) {
  if (request.mode === 'navigate') return true;
  var path = url.pathname;
  if (/\.html$/.test(path)) return true;
  if (/^\/podcasts\/[^/]+-walkthrough-(sidecar|script)\.json$/.test(path)) return true;
  var base = path.split('/').pop();
  return STATIC_BASENAMES.indexOf(base) >= 0;
}

/* ---------- range parsing ---------- */

/* Syntax only: returns {start, end} with one side possibly empty, or
   null when the header is not a single byte range. The numeric range
   is resolved against the total separately, in resolveRange. */
function parseRangeSyntax(header) {
  if (header == null) return null;
  var m = /^bytes=(\d*)-(\d*)$/.exec(String(header).trim());
  if (!m) return null;
  if (m[1] === '' && m[2] === '') return null;
  return { start: m[1], end: m[2] };
}

function resolveRange(parsed, total) {
  var start, end;
  if (parsed.start === '') {
    var suffix = parseInt(parsed.end, 10);
    if (!suffix || suffix <= 0) return { malformed: true };
    start = Math.max(0, total - suffix);
    end = total - 1;
  } else {
    start = parseInt(parsed.start, 10);
    end = parsed.end === '' ? total - 1 : parseInt(parsed.end, 10);
    if (end >= total) end = total - 1;
  }
  if (start >= total) return { outOfRange: true };
  if (start > end) return { malformed: true };
  return { start: start, end: end };
}

/* ---------- metadata (IndexedDB, best effort) ---------- */

function metaOpen() {
  return new Promise(function (resolve, reject) {
    var req;
    try {
      req = indexedDB.open(DB_NAME, 1);
    } catch (e) {
      reject(e);
      return;
    }
    req.onupgradeneeded = function () {
      req.result.createObjectStore(DB_STORE, { keyPath: 'url' });
    };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error || new Error('indexeddb open failed')); };
    req.onblocked = function () { reject(new Error('indexeddb open blocked')); };
  });
}

function metaAll() {
  return metaOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx, store, req;
      try {
        tx = db.transaction(DB_STORE, 'readonly');
        store = tx.objectStore(DB_STORE);
        req = store.getAll();
      } catch (e) {
        reject(e);
        return;
      }
      req.onsuccess = function () { resolve(req.result || []); };
      req.onerror = function () { reject(req.error || new Error('indexeddb read failed')); };
    });
  });
}

function metaPut(record) {
  return metaOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx, store, req;
      try {
        tx = db.transaction(DB_STORE, 'readwrite');
        store = tx.objectStore(DB_STORE);
        req = store.put(record);
      } catch (e) {
        reject(e);
        return;
      }
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error || new Error('indexeddb write failed')); };
    });
  });
}

function metaDelete(url) {
  return metaOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx, store, req;
      try {
        tx = db.transaction(DB_STORE, 'readwrite');
        store = tx.objectStore(DB_STORE);
        req = store.delete(url);
      } catch (e) {
        reject(e);
        return;
      }
      req.onsuccess = function () { resolve(); };
      req.onerror = function () { reject(req.error || new Error('indexeddb delete failed')); };
    });
  });
}

function metaTouch(url) {
  return metaAll().then(function (records) {
    var found = null;
    for (var i = 0; i < records.length; i++) {
      if (records[i].url === url) { found = records[i]; break; }
    }
    if (found) {
      found.lastUsed = Date.now();
      return metaPut(found);
    }
    return caches.open(AUDIO_CACHE).then(function (cache) {
      return cache.match(url);
    }).then(function (res) {
      var bytes = 0;
      if (res) {
        var len = res.headers.get('Content-Length');
        if (len) bytes = parseInt(len, 10) || 0;
      }
      if (!bytes) return;
      return metaPut({ url: url, bytes: bytes, lastUsed: Date.now() });
    });
  });
}

/* ---------- sizes ---------- */

/* Size of a response from its Content-Length header, or by reading a
   clone when the header is absent. Reading a clone never consumes the
   response itself. */
function responseBytes(res) {
  var len = res.headers.get('Content-Length');
  if (len) {
    var n = parseInt(len, 10);
    if (isFinite(n) && n >= 0) return Promise.resolve(n);
  }
  return res.clone().arrayBuffer().then(function (buf) {
    return buf.byteLength;
  }).catch(function () { return 0; });
}

/* ---------- eviction ---------- */

/* Make room for a new audio file of newBytes under newUrl. Deletes the
   least recently played entries first, never the file being put. Falls
   back to cache insertion order when IndexedDB is unavailable; the cap
   still holds either way. Never throws: a metadata failure must never
   fail a playback request. */
function evictAudio(cache, newUrl, newBytes) {
  return metaAll().then(function (records) {
    var total = 0;
    var count = 0;
    var cands = [];
    for (var i = 0; i < records.length; i++) {
      var r = records[i];
      if (r.url === newUrl) continue;
      cands.push(r);
      total += r.bytes || 0;
      count++;
    }
    cands.sort(function (a, b) { return (a.lastUsed || 0) - (b.lastUsed || 0); });
    var jobs = [];
    var k = 0;
    while ((count >= AUDIO_MAX_FILES || total + newBytes > AUDIO_MAX_BYTES) && k < cands.length) {
      var victim = cands[k++];
      total -= victim.bytes || 0;
      count--;
      jobs.push(cache.delete(victim.url));
      jobs.push(metaDelete(victim.url).catch(function () { /* best effort */ }));
    }
    return Promise.all(jobs);
  }).catch(function () {
    return cache.keys().then(function (keys) {
      var total = 0;
      var count = 0;
      var entries = [];
      var seq = Promise.resolve();
      keys.forEach(function (key) {
        if (key.url === newUrl) return;
        seq = seq.then(function () {
          return cache.match(key);
        }).then(function (res) {
          var b = 0;
          if (res) {
            var len = res.headers.get('Content-Length');
            if (len) b = parseInt(len, 10) || 0;
          }
          entries.push({ url: key.url, bytes: b });
          total += b;
          count++;
        });
      });
      return seq.then(function () {
        var jobs = [];
        var k = 0;
        while ((count >= AUDIO_MAX_FILES || total + newBytes > AUDIO_MAX_BYTES) && k < entries.length) {
          var victim = entries[k++];
          total -= victim.bytes || 0;
          count--;
          jobs.push(cache.delete(victim.url));
        }
        return Promise.all(jobs);
      });
    });
  }).catch(function () { /* eviction never blocks a put */ });
}

function evictStatic(cache, newUrl, newBytes) {
  return cache.keys().then(function (keys) {
    var entries = [];
    var total = 0;
    var seq = Promise.resolve();
    keys.forEach(function (key) {
      if (key.url === newUrl) return;
      seq = seq.then(function () {
        return cache.match(key);
      }).then(function (res) {
        var b = 0;
        if (res) {
          var len = res.headers.get('Content-Length');
          if (len) b = parseInt(len, 10) || 0;
        }
        entries.push({ url: key.url, bytes: b });
        total += b;
      });
    });
    return seq.then(function () {
      var jobs = [];
      var k = 0;
      while (total + newBytes > STATIC_MAX_BYTES && k < entries.length) {
        total -= entries[k].bytes || 0;
        jobs.push(cache.delete(entries[k].url));
        k++;
      }
      return Promise.all(jobs);
    });
  }).catch(function () { /* eviction never blocks a put */ });
}

/* Make room for a new music file of newBytes under newUrl. Music is
   nine small files, so eviction works off cache insertion order with
   no IndexedDB: the oldest entry goes first. The music cache is
   separate from the walkthrough cache, so music never counts toward
   the 8-walkthrough cap and never evicts a saved walkthrough. */
function evictMusic(cache, newUrl, newBytes) {
  return cache.keys().then(function (keys) {
    var entries = [];
    var total = 0;
    var seq = Promise.resolve();
    keys.forEach(function (key) {
      if (key.url === newUrl) return;
      seq = seq.then(function () {
        return cache.match(key);
      }).then(function (res) {
        var b = 0;
        if (res) {
          var len = res.headers.get('Content-Length');
          if (len) b = parseInt(len, 10) || 0;
        }
        entries.push({ url: key.url, bytes: b });
        total += b;
      });
    });
    return seq.then(function () {
      var jobs = [];
      var k = 0;
      while ((entries.length >= MUSIC_MAX_FILES || total + newBytes > MUSIC_MAX_BYTES) && k < entries.length) {
        total -= entries[k].bytes || 0;
        jobs.push(cache.delete(entries[k].url));
        k++;
      }
      return Promise.all(jobs);
    });
  }).catch(function () { /* eviction never blocks a put */ });
}

/* ---------- cache puts ---------- */

function notifyCached(url) {
  return self.clients.matchAll({ includeUncontrolled: true }).then(function (list) {
    list.forEach(function (client) {
      try {
        client.postMessage({ type: 'wt-cached', url: url });
      } catch (e) { /* a closed client */ }
    });
  }).catch(function () { /* notify is best effort */ });
}

/* Store a complete 200 audio response under its full URL, after the
   eviction check, then record it and tell the clients. Only complete
   200 responses are ever stored. */
function cacheAudioResponse(url, res) {
  /* Clone up front, before the response is handed to the page: a
     clone made later races the page reading the body, and a clone
     of a consumed body fails, so nothing is cached. The background
     full fetch has no such race (its response is never handed out),
     but cloning here covers both call sites. */
  var copy;
  try { copy = res.clone(); } catch (e) { return Promise.resolve(); }
  return responseBytes(copy).then(function (bytes) {
    return caches.open(AUDIO_CACHE).then(function (cache) {
      return evictAudio(cache, url, bytes).then(function () {
        return cache.put(url, copy);
      }).then(function () {
        return metaPut({ url: url, bytes: bytes, lastUsed: Date.now() }).catch(function () { /* best effort */ });
      }).then(function () {
        return notifyCached(url);
      });
    });
  }).catch(function () { /* a failed cache put never fails playback */ });
}

/* Store a complete 200 music response under its full URL in the
   music cache, after the eviction check. Only complete 200 responses
   are ever stored. No metadata record: music eviction works off the
   cache itself, so music never counts toward the walkthrough cap. */
function cacheMusicResponse(url, res) {
  var copy;
  try { copy = res.clone(); } catch (e) { return Promise.resolve(); }
  return responseBytes(copy).then(function (bytes) {
    return caches.open(MUSIC_CACHE).then(function (cache) {
      return evictMusic(cache, url, bytes).then(function () {
        return cache.put(url, copy);
      }).then(function () {
        return notifyCached(url);
      });
    });
  }).catch(function () { /* a failed cache put never fails playback */ });
}

function backgroundFullFetch(url, put) {
  if (inFlight.has(url)) return inFlight.get(url);
  var p = fetch(url).then(function (res) {
    if (res && res.status === 200) return put(url, res);
    return null;
  }).catch(function () {
    return null;
  });
  p.then(function () { inFlight.delete(url); }, function () { inFlight.delete(url); });
  inFlight.set(url, p);
  return p;
}

/* ---------- audio ---------- */

/* A 206 slice of a cached full audio file. The bytes and headers are
   the cached file's own, only the range headers are computed. */
function sliceResponse(cached, buf, total, range) {
  var slice = buf.slice(range.start, range.end + 1);
  var type = cached.headers.get('Content-Type') || 'audio/mpeg';
  return new Response(slice, {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Range': 'bytes ' + range.start + '-' + range.end + '/' + total,
      'Content-Length': String(range.end - range.start + 1),
      'Content-Type': type,
      'Accept-Ranges': 'bytes'
    }
  });
}

/* kind is 'audio' for a walkthrough or 'music' for a background
   music track. Both go through the same range slicing and caching,
   into their own cache. */
function handleAudio(event, request, kind) {
  var url = request.url;
  var isMusic = kind === 'music';
  var cacheName = isMusic ? MUSIC_CACHE : AUDIO_CACHE;
  var put = isMusic ? cacheMusicResponse : cacheAudioResponse;
  var rangeHeader = request.headers.get('Range');
  var parsed = parseRangeSyntax(rangeHeader);
  if (rangeHeader !== null && !parsed) {
    /* Malformed Range: pass to the network untouched. */
    return fetch(request);
  }
  return caches.open(cacheName).then(function (cache) {
    return cache.match(url).then(function (cached) {
      if (cached) {
        if (!parsed) {
          /* A media load must come from one source for its whole
             life: in Chromium, mixing a synthetic cache slice and
             a network stream for the same URL aborts the load, in
             either order. A slice after a network stream was the
             P33 cold-seek failure; a network stream after a slice
             fails the same way on a warm cache. So a media request
             goes to the network while online and only falls back
             to the cached copy when the network fails, which is
             the offline case. A fetch() request takes the cached
             copy directly. */
          if (request.destination === 'audio') {
            return fetch(request).catch(function () { return cached; });
          }
          return cached;
        }
        return cached.arrayBuffer().then(function (buf) {
          var total = buf.byteLength;
          var range = resolveRange(parsed, total);
          if (range.malformed) return fetch(request);
          if (range.outOfRange) {
            return new Response(null, {
              status: 416,
              statusText: 'Range Not Satisfiable',
              headers: { 'Content-Range': 'bytes */' + total }
            });
          }
          /* Same one-source rule as above: a media range goes to
             the network while online, and the cache slice serves
             it only when the network fails (offline). A fetch()
             range is sliced from the cache. */
          if (request.destination === 'audio') {
            return fetch(request).catch(function () {
              return sliceResponse(cached, buf, total, range);
            });
          }
          return sliceResponse(cached, buf, total, range);
        });
      }
      if (!parsed) {
        return fetch(request).then(function (res) {
          if (res && res.status === 200) {
            event.waitUntil(put(url, res));
          }
          return res;
        }).catch(function () {
          return new Response(OFFLINE_AUDIO_TEXT, {
            status: 504,
            statusText: 'Gateway Timeout',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      }
      /* Cache miss with a Range header: the network 206 goes back
         as-is and is never cached. A full fetch runs in the
         background so the next play comes from the cache. */
      event.waitUntil(backgroundFullFetch(url, put));
      return fetch(request).catch(function () {
        return new Response(OFFLINE_AUDIO_TEXT, {
          status: 504,
          statusText: 'Gateway Timeout',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    });
  });
}

/* ---------- static ---------- */

function handleStatic(request) {
  var url = request.url;
  return caches.open(STATIC_CACHE).then(function (cache) {
    var res;
    return fetch(request).then(function (r) {
      res = r;
      if (res && res.status === 200) {
        return responseBytes(res).then(function (bytes) {
          return evictStatic(cache, url, bytes).then(function () {
            return cache.put(url, res.clone());
          }).catch(function () { /* a failed cache put never fails the page */ });
        });
      }
      return null;
    }).catch(function () {
      return cache.match(url).then(function (hit) {
        if (hit) return hit;
        /* A static file is requested with a version query (?v=) that
           the activate-time warming did not know, so the exact key
           misses while the same file sits cached under its plain
           URL. Fall back to a copy with the same path. Online the
           network-first fetch above always wins, so this never
           serves a stale copy while online; offline it is the
           difference between the page loading and failing. */
        return cache.keys().then(function (keys) {
          var path;
          try { path = new URL(url).pathname; } catch (e) { path = null; }
          if (!path) throw new Error('network failed and nothing cached for ' + url);
          for (var i = 0; i < keys.length; i++) {
            var kp;
            try { kp = new URL(keys[i].url).pathname; } catch (e) { kp = null; }
            if (kp === path) return cache.match(keys[i]);
          }
          throw new Error('network failed and nothing cached for ' + url);
        });
      });
    }).then(function (fallback) {
      return fallback || res;
    });
  });
}

/* ---------- messages ---------- */

self.addEventListener('message', function (event) {
  var data = event.data || {};
  if (data.type === 'wt-cached?') {
    var port = event.ports && event.ports[0];
    event.waitUntil(caches.open(AUDIO_CACHE).then(function (cache) {
      return cache.match(data.url);
    }).then(function (hit) {
      if (port) port.postMessage({ cached: !!hit });
    }).catch(function () {
      if (port) port.postMessage({ cached: false });
    }));
    return;
  }
  if (data.type === 'wt-playing') {
    event.waitUntil(metaTouch(data.url).catch(function () { /* best effort */ }));
    return;
  }
  if (data.type === 'wt-version') {
    var port2 = event.ports && event.ports[0];
    if (port2) port2.postMessage({ version: WT_SW_VERSION });
  }
});

/* ---------- lifecycle ---------- */

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim().then(function () {
    return caches.keys();
  }).then(function (names) {
    return Promise.all(names.map(function (name) {
      if (name !== AUDIO_CACHE && name !== STATIC_CACHE && name !== MUSIC_CACHE) return caches.delete(name);
      return null;
    }));
  }).then(function () {
    /* The first navigation of a visit bypasses the worker: the page
       HTML is fetched before the worker is installed, and the
       sidecar, script and player files are fetched before the
       worker takes over, so the fetch handler never sees them and
       never caches them. Cache what each controlled client needs,
       so one online visit is enough for the offline reload to work:
       the page itself, its walkthrough sidecar and script (from the
       page slug), and the static files the page loads. Best effort;
       a failure here never breaks activation, and a 404 for a page
       without a walkthrough simply caches nothing. */
    return self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(function (list) {
      return caches.open(STATIC_CACHE).then(function (cache) {
        function cacheOne(url) {
          return fetch(url).then(function (res) {
            if (!res || res.status !== 200) return null;
            return responseBytes(res).then(function (bytes) {
              return evictStatic(cache, url, bytes).then(function () {
                return cache.put(url, res.clone());
              });
            });
          }).catch(function () { return null; });
        }
        return Promise.all(list.map(function (client) {
          var urls = [client.url];
          var base;
          try { base = new URL(client.url); } catch (e) { base = null; }
          if (base) {
            var leaf = base.pathname.split('/').pop() || '';
            if (/\.html$/.test(leaf)) {
              var slug = leaf.slice(0, -5);
              urls.push(new URL('/podcasts/' + slug + '-walkthrough-sidecar.json', base).href);
              urls.push(new URL('/podcasts/' + slug + '-walkthrough-script.json', base).href);
            }
            STATIC_BASENAMES.forEach(function (name) {
              urls.push(new URL('/' + name, base).href);
            });
          }
          return Promise.all(urls.map(cacheOne));
        }));
      });
    }).catch(function () { return null; });
  }));
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;
  var url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (isWalkthroughAudio(url)) {
    event.respondWith(handleAudio(event, request, 'audio'));
    return;
  }
  if (isMusicAudio(url)) {
    event.respondWith(handleAudio(event, request, 'music'));
    return;
  }
  if (isStatic(request, url)) {
    event.respondWith(handleStatic(request));
  }
});
