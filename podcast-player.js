/* podcast-player.js: "Listen to the podcast" row under each tutorial's title block.
   Plan: ~/workspace/tutorial-podcasts/player/PLAN.md (rev 2). Loaded by the
   PODCAST-HOOK in tutorial-nav.js. The EPISODES block is written by
   ingest.py; do not edit it by hand. With no episode for a page, nothing renders. */
(function () {
  'use strict';
  if (window.__pcPlayer) return;
  window.__pcPlayer = true;

  /* EPISODES-BEGIN */
  var EPISODES = {
    "distributions.html": {"src": "podcasts/distributions.mp3?v=5f4420a6", "secs": 1012},
    "eigen-svd.html": {"src": "podcasts/eigen-svd.mp3?v=abb880c4", "secs": 830},
    "linear-algebra.html": {"src": "podcasts/linear-algebra.mp3?v=bfd4a943", "secs": 767},
    "logistic.html": {"src": "podcasts/logistic.mp3?v=b0b41b70", "secs": 660},
    "mlp.html": {"src": "podcasts/mlp.mp3?v=0c3ea04f", "secs": 676},
    "probability.html": {"src": "podcasts/probability.mp3?v=8d890cce", "secs": 894},
    "regression.html": {"src": "podcasts/regression.mp3?v=304c9f3c", "secs": 723},
    "rl-methods.html": {"src": "podcasts/rl-methods.mp3?v=cd6e6ccc", "secs": 906},
    "rl.html": {"src": "podcasts/rl.mp3?v=a30eec77", "secs": 851},
    "svm.html": {"src": "podcasts/svm.mp3?v=9445c87c", "secs": 787},
    "trees.html": {"src": "podcasts/trees.mp3?v=234e8a77", "secs": 687}
  };
  /* EPISODES-END */

  /* NOTEBOOKLM-BEGIN: permanent NotebookLM Audio Overview links, one per
     tutorial page. Ramin's order 2026-11-11: once a link is at the top of a
     tutorial page it stays there, never removed, replaced or changed.
     ingest.py replaces only the EPISODES block above, so this block survives
     episode ingests. Do not edit the URLs here; a link that fails its check
     is reported, never swapped. */
  var NOTEBOOKLM = {
    "rl.html": "https://notebook.google.com/notebook/f9b57fa8-973f-4f63-960f-4d60af26a393",
    "rl-methods.html": "https://notebook.google.com/notebook/3081561c-3a7e-4bce-aaf4-22c05c28ddec",
    "q-learning.html": "https://notebook.google.com/notebook/0231f250-33c1-4429-a5e0-399fccfee7be",
    "rl-policy-gradients.html": "https://notebook.google.com/notebook/cc54fe8f-a319-43e2-bdb9-15870ccc696b",
    "reinforce.html": "https://notebook.google.com/notebook/3e2020f8-5c27-4f91-8721-3931f228b3a9",
    "actor-critic.html": "https://notebook.google.com/notebook/98190f6a-3d31-45a4-847a-b46808e01eb7",
    "ppo.html": "https://notebook.google.com/notebook/a71e9b74-00a0-4547-827c-2101f659ec3c",
    "rl-continuous-actions.html": "https://notebook.google.com/notebook/1c9e0b0b-3308-44fb-a686-ea5dd5e4b5dd",
    "rl-model-based.html": "https://notebook.google.com/notebook/b44e7cd3-8a76-410b-9298-53c40cdd393b",
    "dyna.html": "https://notebook.google.com/notebook/54c4706a-4375-4e1a-8065-16307218246b",
    "alphazero.html": "https://notebook.google.com/notebook/e17462d2-c017-4d6a-98ce-fbe4bd6f2a8f",
    "muzero.html": "https://notebook.google.com/notebook/6d79f7d2-2cc2-42ad-b684-46c721e0acf9",
    "dreamer.html": "https://notebook.google.com/notebook/74b0f4d0-e231-4e83-9356-e0a20a7cef47",
    "sac.html": "https://notebook.google.com/notebook/a0251c0f-7d83-4b00-8082-974c0e4113fc",
    "reward-models.html": "https://notebook.google.com/notebook/1502e0bb-0f82-4f30-81d6-d73bb7a57932",
    "rlhf.html": "https://notebook.google.com/notebook/9e9b2ac5-a761-42df-bd07-fcf7ecb5b06e",
    "constitutional-ai.html": "https://notebook.google.com/notebook/35f947cf-2e97-4686-a308-1d23ae503bb5",
    "rlaif.html": "https://notebook.google.com/notebook/11007455-73c1-4f65-a4af-e763f84cd150",
    "dpo.html": "https://notebook.google.com/notebook/af9a6ec5-d2c1-43c0-ab1b-5cab981e21cf",
    "grpo.html": "https://notebook.google.com/notebook/7d4cc265-49a6-4985-bd32-f8ea5c23cd4b",
    "dqn.html": "https://notebook.google.com/notebook/778c632e-e2da-40d1-9fc5-b66ecd6e23b3",
    "ddpg.html": "https://notebook.google.com/notebook/2125c00f-f7ec-45fb-a01b-2e41af1644bd",
    "ddpg-training.html": "https://notebook.google.com/notebook/0230d3f3-5705-499d-afa3-62ac0c06e8da",
    "td3.html": "https://notebook.google.com/notebook/bebcbe5c-11cf-4177-997a-4b9dfabda5a8",
    "multi-agent-rl.html": "https://notebook.google.com/notebook/1ee62498-b591-4d34-9626-bb206dba9750",
    "rl-alignment.html": "https://notebook.google.com/notebook/a7b1a198-94cf-49c6-8e80-16bce4dcebab"
  };
  /* NOTEBOOKLM-END */

  var SELF = document.currentScript;
  var BASE = (SELF && SELF.src) || document.baseURI;

  function pageName(pathname) {
    var p = String(pathname || '');
    try { p = decodeURIComponent(p); } catch (e) { /* keep raw */ }
    if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
    var seg = p.split('/').pop().toLowerCase();
    if (!seg) return null;
    if (seg.indexOf('.') < 0) seg += '.html';
    if (seg === 'index.html') return null;
    return seg;
  }

  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    var m = Math.floor(s / 60), r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function mins(s) { return Math.max(1, Math.round((s || 0) / 60)) + ' min'; }

  function load(key) {
    try { var v = JSON.parse(localStorage.getItem(key) || 'null'); return v && typeof v === 'object' ? v : null; }
    catch (e) { return null; }
  }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  function clear(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }

  var CSS =
    '.pc-row{margin:.75rem 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .6rem;color-scheme:light}' +
    '.pc-btn{display:inline-flex;align-items:center;gap:.35em;min-height:44px;padding:.45rem .7rem;' +
    'font:inherit;font-size:1rem;line-height:1.2;white-space:normal;max-width:100%;text-align:left;cursor:pointer;' +
    'color:#1f618d;background:#fff;border:1px solid #1f618d;border-radius:8px}' +
    '@media (hover:hover){.pc-btn:hover{background:#eef4f9}}' +
    '.pc-btn:focus-visible,.pc-row audio:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.pc-btn svg{width:.8em;height:.8em;flex:none}' +
    '.pc-row audio{width:100%;max-width:560px;height:44px}' +
    '.pc-msg{color:#333}' +
    '.pc-nb{color:#1f618d}' +
    '@media print{.pc-row{display:none}}';

  function svgPlay() {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', '0 0 10 10');
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M1 0.5 L9.5 5 L1 9.5 Z');
    p.setAttribute('style', 'fill:currentColor');
    s.appendChild(p);
    return s;
  }

  function button(text, withIcon) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pc-btn';
    if (withIcon) b.appendChild(svgPlay());
    b.appendChild(document.createTextNode(text));
    return b;
  }

  /* Insert right after the H1 and its dek or subtitle, before any series map,
     so the row is on the first phone screen (DECISIONS D2 rev 3). */
  function anchorAfter(h1) {
    var n = h1.nextElementSibling;
    if (n && n.tagName === 'P' && (n.classList.contains('dek') || n.classList.contains('subtitle'))) return n;
    return h1;
  }

  function init() {
    if (document.querySelector('.pc-row')) return;
    var page = pageName(location.pathname);
    var ep = page && EPISODES[page];
    var nb = page && NOTEBOOKLM[page];
    if ((!ep || !ep.src) && !nb) return;
    var h1 = document.querySelector('h1');
    if (!h1) return;
    var title = (h1.textContent || '').replace(/\s+/g, ' ').trim();
    var src = null;
    if (ep && ep.src) { try { src = new URL(ep.src, BASE).href; } catch (e) { return; } }
    var key = 'pc:' + page;
    var ver = ep ? String(ep.src) : '';

    var st = document.createElement('style');
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);

    var row = document.createElement('div');
    row.className = 'pc-row';
    var a = anchorAfter(h1);
    a.parentNode.insertBefore(row, a.nextSibling);

    var current = null;
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && current) current(); });
    window.addEventListener('pagehide', function () { if (current) current(); });

    /* Permanent NotebookLM link for this page, if one exists. Ramin's order
       2026-11-11: once the link is at the top of a tutorial page it stays
       there, never removed, replaced or changed. */
    function nbLink() {
      if (!nb) return null;
      var w = document.createElement('span');
      var l = document.createElement('a');
      l.href = nb;
      l.target = '_blank';
      l.rel = 'noopener';
      l.className = 'pc-nb';
      l.textContent = 'Listen on NotebookLM';
      w.appendChild(l);
      var note = document.createElement('span');
      note.className = 'pc-msg';
      note.textContent = ' Opens in NotebookLM.';
      w.appendChild(note);
      return w;
    }

    function rest() {
      row.textContent = '';
      if (ep && ep.src) {
        var saved = load(key);
        var t = saved && saved.v === ver && typeof saved.t === 'number' && isFinite(saved.t) ? saved.t : 0;
        var pos = t > 5 && (!ep.secs || t < ep.secs - 5) ? t : 0;
        var label = pos ? 'Resume podcast (' + fmt(pos) + ' of ' + mins(ep.secs) + ')'
                        : 'Listen to the podcast (' + mins(ep.secs) + ')';
        var b = button(label, true);
        b.addEventListener('click', function () { open(pos); });
        row.appendChild(b);
      }
      var n = nbLink();
      if (n) row.appendChild(n);
    }

    function fail(pos) {
      current = null;
      row.textContent = '';
      var m = document.createElement('span');
      m.className = 'pc-msg';
      m.setAttribute('role', 'status');
      m.id = 'pc-msg';
      var again = button('Try again', false);
      again.setAttribute('aria-describedby', 'pc-msg');
      again.addEventListener('click', function () {
        var sv = load(key);
        var t = sv && sv.v === ver && typeof sv.t === 'number' && isFinite(sv.t) ? sv.t : 0;
        open(Math.max(pos || 0, t));
      });
      row.appendChild(m);
      row.appendChild(again);
      var n = nbLink();
      if (n) row.appendChild(n);
      setTimeout(function () { m.textContent = 'The podcast could not load.'; again.focus(); }, 50);
    }

    function open(pos) {
      row.textContent = '';
      var au = document.createElement('audio');
      au.controls = true;
      au.preload = 'none';
      au.setAttribute('aria-label', 'Podcast: ' + title);
      var sp = load('pc:speed');
      var r = sp && sp.r > 0.4 && sp.r < 4 ? sp.r : 1;
      au.defaultPlaybackRate = r;
      au.playbackRate = r;
      var seeked = false;
      function keep() { if (au.currentTime > 0 && !au.ended) save(key, { t: au.currentTime, v: ver }); }
      au.addEventListener('error', function () { fail(pos); });
      au.addEventListener('loadedmetadata', function () {
        if (pos && !seeked) { seeked = true; try { au.currentTime = pos; } catch (e) { /* ignore */ } }
        au.playbackRate = r;
      });
      au.addEventListener('ratechange', function () {
        if (au.playbackRate > 0) { r = au.playbackRate; save('pc:speed', { r: r }); }
      });
      var last = 0;
      au.addEventListener('timeupdate', function () {
        var now = Date.now();
        if (now - last > 5000) { last = now; keep(); }
      });
      au.addEventListener('pause', keep);
      au.addEventListener('seeked', keep);
      au.addEventListener('ended', function () { clear(key); });
      current = keep;
      au.src = src;
      row.appendChild(au);
      var n = nbLink();
      if (n) row.appendChild(n);
      if ('mediaSession' in navigator && window.MediaMetadata) {
        try { navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: "Ramin's tutorials" }); } catch (e) { /* ignore */ }
      }
      try { au.focus(); } catch (e) { /* ignore */ }
      var p = au.play();
      if (p && p.catch) p.catch(function () { /* controls stay for a second tap */ });
    }

    rest();
  }

  function safeInit() { try { init(); } catch (e) { /* nothing renders */ } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeInit);
  else safeInit();
})();
