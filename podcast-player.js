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
    "rl.html": "https://notebook.google.com/notebook/7b03075f-e522-4a31-aafd-73708b40b2ac",
    "rl-methods.html": "https://notebooklm.google.com/notebook/6b1f6219-63bb-4a8f-8dd6-c74869ae65b4",
    "q-learning.html": "https://notebooklm.google.com/notebook/1ce1db23-6f84-4a0a-8b2a-95472656cadc",
    "sarsa.html": "https://notebooklm.google.com/notebook/f42f2ace-f503-476e-a8e8-3bcbecea9ee7",
    "rl-policy-gradients.html": "https://notebooklm.google.com/notebook/59ba91ed-3099-4ec9-b2db-8ebccbc68be0",
    "reinforce.html": "https://notebooklm.google.com/notebook/3844e620-10a9-4666-9726-3f5066c657ce",
    "actor-critic.html": "https://notebooklm.google.com/notebook/02420a7d-8113-4f13-830e-ee1e84a33440",
    "ppo.html": "https://notebooklm.google.com/notebook/238ba31d-0351-48fc-b7b3-15d726bc016e",
    "rl-continuous-actions.html": "https://notebooklm.google.com/notebook/35d2707b-2dae-4cbc-860b-29101ccaa01b",
    "rl-model-based.html": "https://notebook.google.com/notebook/b44e7cd3-8a76-410b-9298-53c40cdd393b",
    "dyna.html": "https://notebook.google.com/notebook/54c4706a-4375-4e1a-8065-16307218246b",
    "alphazero.html": "https://notebook.google.com/notebook/e17462d2-c017-4d6a-98ce-fbe4bd6f2a8f",
    "muzero.html": "https://notebook.google.com/notebook/6d79f7d2-2cc2-42ad-b684-46c721e0acf9",
    "dreamer.html": "https://notebook.google.com/notebook/74b0f4d0-e231-4e83-9356-e0a20a7cef47",
    "sac.html": "https://notebooklm.google.com/notebook/0cb19f89-2863-4975-8582-d8660d15aa25",
    "reward-models.html": "https://notebook.google.com/notebook/1502e0bb-0f82-4f30-81d6-d73bb7a57932",
    "rlhf.html": "https://notebook.google.com/notebook/9e9b2ac5-a761-42df-bd07-fcf7ecb5b06e",
    "constitutional-ai.html": "https://notebook.google.com/notebook/35f947cf-2e97-4686-a308-1d23ae503bb5",
    "rlaif.html": "https://notebook.google.com/notebook/11007455-73c1-4f65-a4af-e763f84cd150",
    "dpo.html": "https://notebook.google.com/notebook/af9a6ec5-d2c1-43c0-ab1b-5cab981e21cf",
    "grpo.html": "https://notebook.google.com/notebook/7d4cc265-49a6-4985-bd32-f8ea5c23cd4b",
    "dqn.html": "https://notebooklm.google.com/notebook/e43d58d4-f521-4e96-858e-5e3ce2a6ad66",
    "double-dqn.html": "https://notebooklm.google.com/notebook/3c370629-fe12-4f5b-92d8-a4bcd5e184f5",
    "dueling-dqn.html": "https://notebooklm.google.com/notebook/e3f56f6d-1802-4a2c-9f13-fa97bb45a486",
    "ddpg.html": "https://notebooklm.google.com/notebook/a83e9f7d-2d35-453f-b655-1287cc9cd6a6",
    "ddpg-training.html": "https://notebooklm.google.com/notebook/1e25a78a-04ce-45f7-a52c-54d88e814106",
    "td3.html": "https://notebooklm.google.com/notebook/b57e74f1-df2d-4e88-b774-f16ad4f9ebfe",
    "multi-agent-rl.html": "https://notebook.google.com/notebook/1ee62498-b591-4d34-9626-bb206dba9750",
    "rl-alignment.html": "https://notebook.google.com/notebook/a7b1a198-94cf-49c6-8e80-16bce4dcebab",
    "tokenizers.html": "https://notebook.google.com/notebook/8ea17045-fe45-45a5-8a48-f36676edeaa6",
    "subword-tokenization.html": "https://notebook.google.com/notebook/e267f68f-4e48-4bbc-a839-9ad46edbf0bb",
    "wordpiece.html": "https://notebook.google.com/notebook/2eff1cd8-8082-41a6-ba3d-88d055f40f18",
    "unigram-tokenizer.html": "https://notebook.google.com/notebook/57d6deb2-b82a-41df-b496-7450c2dc84a8",
    "sentencepiece.html": "https://notebooklm.google.com/notebook/baea4420-3c8a-4a0f-85c1-c73eec6ae033",
    "decoding.html": "https://notebook.google.com/notebook/5ed7b83c-835f-429e-bb48-2a2f983bbd89",
    "beam-search.html": "https://notebook.google.com/notebook/88c06a71-686f-4bfb-aaea-45933826982e",
    "sampling.html": "https://notebook.google.com/notebook/6e6ad94c-f4e6-4b26-a7c7-152ecfb62dcf",
    "mixture-of-experts.html": "https://notebook.google.com/notebook/8ed91f15-da4d-48d3-8264-a2656aad8c0e",
    "mixture-of-experts-designs.html": "https://notebook.google.com/notebook/ab0348c4-4ae6-4848-a3ef-71a4a38a3b54",
    "moe-bias-balancing.html": "https://notebook.google.com/notebook/f8bc9a5e-6da4-4e4c-8629-4628dee9a48b",
    "moe-expert-parallelism.html": "https://notebook.google.com/notebook/da7efb4f-246d-438d-b791-e1623bdcb053",
    "moe-fine-tuning.html": "https://notebook.google.com/notebook/108eef86-2a8c-4027-b733-231d06eaa010",
    "probes.html": "https://notebook.google.com/notebook/f415147b-8606-41c0-a40b-2c0f62788a1d",
    "blip.html": "https://notebook.google.com/notebook/9f027a66-a359-400b-9af8-5d18f025334e",
    "qformer.html": "https://notebook.google.com/notebook/2384fcf0-207e-42ad-8680-4dfcae229114",
    "deepseek-r1.html": "https://notebooklm.google.com/notebook/86c9470f-3239-4b20-933f-ffffcdbed848",
    "transformers.html": "https://notebooklm.google.com/notebook/928622f7-8b6d-421f-a33e-7d09e56d54f8",
    "transformer-position-masking.html": "https://notebooklm.google.com/notebook/08b2fcb7-da81-47d5-aa35-bc530372e3d8",
    "rope.html": "https://notebooklm.google.com/notebook/24d63ea7-178e-4ccc-b281-8cd069dc49e6",
    "attention-masks.html": "https://notebook.google.com/notebook/dd1bbdb2-5890-46be-a7cf-3d3d9acc0ab8",
    "transformer-block.html": "https://notebook.google.com/notebook/e4f911ec-1b15-47ed-aad9-627ff596df7f",
    "transformer-architectures.html": "https://notebook.google.com/notebook/c2d00561-a3cb-4b28-b584-381353dc1d9a",
    "cross-attention.html": "https://notebooklm.google.com/notebook/fb198f3b-6599-42b0-b003-f3f4d4e765fd",
    "transformer-cost.html": "https://notebook.google.com/notebook/4d123a79-6613-4670-90e6-e78722e35ea7",
    "flash-attention.html": "https://notebook.google.com/notebook/ef2512aa-7323-4bcf-87b8-79bb81954f52",
    "kv-cache.html": "https://notebook.google.com/notebook/da95b37e-6582-4c46-bb02-bdb1875c4caf",
    "grouped-query-attention.html": "https://notebook.google.com/notebook/82177b2d-f13f-4436-8ba5-6321c58878fa",
    "sliding-window-attention.html": "https://notebook.google.com/notebook/955a3e6c-732d-46e9-a5a3-ea6a75521c5b",
    "attention-sinks.html": "https://notebook.google.com/notebook/e2d5ec42-a372-4b31-a6c0-dd266154c77c",
    "adapter.html": "https://notebook.google.com/notebook/ba46a29c-c157-41b4-9c38-1afd3af6ba37",
    "lora.html": "https://notebook.google.com/notebook/f349173f-a9e8-4438-b265-9d433c39462c",
    "conformer.html": "https://notebook.google.com/notebook/5aa3c0c9-187d-4ea5-ab4c-a63a0155c89c",
    "conformer-pytorch.html": "https://notebook.google.com/notebook/04e61aa3-67c6-474f-9da5-046ea7408234"
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
