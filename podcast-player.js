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
     2026-11-24: Ramin's approved episode-length plan removes 20 links
     outside 15 to 25 minutes; in-band links stay.
     ingest.py replaces only the EPISODES block above, so this block survives
     episode ingests. Do not edit the URLs here; a link that fails its check
     is reported, never swapped. */
  var NOTEBOOKLM = {
    "rl.html": "https://notebook.google.com/notebook/7b03075f-e522-4a31-aafd-73708b40b2ac",
    "rl-methods.html": "https://notebooklm.google.com/notebook/6b1f6219-63bb-4a8f-8dd6-c74869ae65b4",
    "q-learning.html": "https://notebooklm.google.com/notebook/a646a3c9-6639-459b-b60b-afa81b0ba6b1",
    "sarsa.html": "https://notebooklm.google.com/notebook/275fdfee-4ac6-495c-b27f-da3d80607300",
    "rl-policy-gradients.html": "https://notebooklm.google.com/notebook/37d682c0-b909-4cb2-b543-2d9b9a7341bd",
    "reinforce.html": "https://notebooklm.google.com/notebook/3844e620-10a9-4666-9726-3f5066c657ce",
    "actor-critic.html": "https://notebooklm.google.com/notebook/02420a7d-8113-4f13-830e-ee1e84a33440",
    "ppo.html": "https://notebooklm.google.com/notebook/238ba31d-0351-48fc-b7b3-15d726bc016e",
    "rl-continuous-actions.html": "https://notebooklm.google.com/notebook/35d2707b-2dae-4cbc-860b-29101ccaa01b",
    "rl-model-based.html": "https://notebook.google.com/notebook/4f8a8d37-f1ef-4890-bd82-7a0fc860006b",
    "dyna.html": "https://notebook.google.com/notebook/2a1849ea-47a5-4817-a983-be00f01db5d8",
    "alphazero.html": "https://notebook.google.com/notebook/b68d7ebf-90ef-494f-a3c8-a316ce98fbbb",
    "muzero.html": "https://notebook.google.com/notebook/b8861a1b-72a5-49f5-9fc6-78c5bf745e67",
    "dreamer.html": "https://notebook.google.com/notebook/cfe96d17-7d7e-4159-b2aa-ddc3835da1a6",
    "sac.html": "https://notebooklm.google.com/notebook/0cb19f89-2863-4975-8582-d8660d15aa25",
    "reward-models.html": "https://notebook.google.com/notebook/4edb2a24-d1f0-47fc-8021-db528adfbfaa",
    "rlhf.html": "https://notebook.google.com/notebook/1731f1e0-e776-4dcb-a962-c4f99afd4a27",
    "constitutional-ai.html": "https://notebook.google.com/notebook/b39fa636-f3e6-41ad-bdf8-53dd5d83795f",
    "rlaif.html": "https://notebook.google.com/notebook/fbb2a9c8-69e8-453a-a99f-0cda9bc50961",
    "dpo.html": "https://notebook.google.com/notebook/003c3d06-a5e3-44fc-8c12-0e8dc8358ea9",
    "grpo.html": "https://notebook.google.com/notebook/f174bb26-ebe4-4ac9-9bff-d8b17e6f75ce",
    "dqn.html": "https://notebooklm.google.com/notebook/e43d58d4-f521-4e96-858e-5e3ce2a6ad66",
    "double-dqn.html": "https://notebooklm.google.com/notebook/a4ddb347-2453-4ab8-8104-00de3ba69651",
    "dueling-dqn.html": "https://notebooklm.google.com/notebook/857a35f6-8a3d-4b94-bb9e-d1ac99d6e786",
    "ddpg.html": "https://notebooklm.google.com/notebook/a83e9f7d-2d35-453f-b655-1287cc9cd6a6",
    "ddpg-training.html": "https://notebooklm.google.com/notebook/1e25a78a-04ce-45f7-a52c-54d88e814106",
    "td3.html": "https://notebooklm.google.com/notebook/b57e74f1-df2d-4e88-b774-f16ad4f9ebfe",
    "multi-agent-rl.html": "https://notebook.google.com/notebook/7bc24c98-a39b-457b-baa2-8aad62cdf726",
    "rl-alignment.html": "https://notebook.google.com/notebook/433c365f-da52-4188-b934-782cafa9d73e",
    "tokenizers.html": "https://notebook.google.com/notebook/8ea17045-fe45-45a5-8a48-f36676edeaa6",
    "subword-tokenization.html": "https://notebook.google.com/notebook/e267f68f-4e48-4bbc-a839-9ad46edbf0bb",
    "sentencepiece.html": "https://notebooklm.google.com/notebook/baea4420-3c8a-4a0f-85c1-c73eec6ae033",
    "beam-search.html": "https://notebook.google.com/notebook/88c06a71-686f-4bfb-aaea-45933826982e",
    "sampling.html": "https://notebook.google.com/notebook/6e6ad94c-f4e6-4b26-a7c7-152ecfb62dcf",
    "moe-bias-balancing.html": "https://notebook.google.com/notebook/f8bc9a5e-6da4-4e4c-8629-4628dee9a48b",
    "moe-expert-parallelism.html": "https://notebook.google.com/notebook/da7efb4f-246d-438d-b791-e1623bdcb053",
    "probes.html": "https://notebook.google.com/notebook/f415147b-8606-41c0-a40b-2c0f62788a1d",
    "qformer.html": "https://notebook.google.com/notebook/2384fcf0-207e-42ad-8680-4dfcae229114",
    "deepseek-r1.html": "https://notebooklm.google.com/notebook/86c9470f-3239-4b20-933f-ffffcdbed848",
    "attention-masks.html": "https://notebook.google.com/notebook/926ca40a-09f2-4101-93ed-f7a79b39a7be",
    "transformer-architectures.html": "https://notebook.google.com/notebook/9f2999ae-3ef7-4324-818e-89b8ecb5e0af",
    "lora.html": "https://notebook.google.com/notebook/3f2260d3-8426-42e9-9538-48ba8d52662b",
    "conformer.html": "https://notebook.google.com/notebook/9ae83fb6-49b8-4966-b051-6f78671d2bde"
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
