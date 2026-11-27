/* walkthrough-player.js: "Walk through with audio" read-along companion.
   Plan: notebooklm-walkthrough-player-plan.md (sections 1, 2, 3 and 5).
   Loaded by tutorial-nav.js beside the PODCAST-HOOK. The WALKTHROUGHS
   block is written by ingest.py walkthrough mode; do not edit it by hand.
   Vanilla script, no dependencies. With no walkthrough for a page, the
   walkthrough span is removed and nothing renders. */
(function () {
  'use strict';
  if (window.__wtPlayer) return;
  window.__wtPlayer = true;

  /* WALKTHROUGHS-BEGIN */
  var WALKTHROUGHS = {
    "actor-critic.html": {"audio": "podcasts/actor-critic-walkthrough.mp3?v=9d2ba14c", "sidecar": "podcasts/actor-critic-walkthrough-sidecar.json?v=9d2ba14c", "script": "podcasts/actor-critic-walkthrough-script.json?v=9d2ba14c", "version": "9d2ba14c", "fingerprint": "3604c6187c8f50cbe9cbe6fa5adffcccdca4fa0af15c16a721f161630f4d8228", "formatVersion": 1, "totalSecs": 1846},
    "alphazero.html": {"audio": "podcasts/alphazero-walkthrough.mp3?v=d742ea00", "sidecar": "podcasts/alphazero-walkthrough-sidecar.json?v=d742ea00", "script": "podcasts/alphazero-walkthrough-script.json?v=d742ea00", "version": "d742ea00", "fingerprint": "8847c1c75279abe1d2479efe7940165fad161e5138ee0dd68ad8405c0ccabc32", "formatVersion": 1, "totalSecs": 2397},
    "constitutional-ai.html": {"audio": "podcasts/constitutional-ai-walkthrough.mp3?v=bc272d60", "sidecar": "podcasts/constitutional-ai-walkthrough-sidecar.json?v=bc272d60", "script": "podcasts/constitutional-ai-walkthrough-script.json?v=bc272d60", "version": "bc272d60", "fingerprint": "f91c95a0a728a1a7593ced704519b804cda78f523b6b03880baf264e3cdb7e81", "formatVersion": 1, "totalSecs": 1461},
    "ddpg-training.html": {"audio": "podcasts/ddpg-training-walkthrough.mp3?v=bf6216db", "sidecar": "podcasts/ddpg-training-walkthrough-sidecar.json?v=bf6216db", "script": "podcasts/ddpg-training-walkthrough-script.json?v=bf6216db", "version": "bf6216db", "fingerprint": "4101252911ba7654c6645745da5958cb1fd203c2780513090d027433faf917d5", "formatVersion": 1, "totalSecs": 1950},
    "ddpg.html": {"audio": "podcasts/ddpg-walkthrough.mp3?v=bb12a676", "sidecar": "podcasts/ddpg-walkthrough-sidecar.json?v=bb12a676", "script": "podcasts/ddpg-walkthrough-script.json?v=bb12a676", "version": "bb12a676", "fingerprint": "92ea257362e504cd0b2e5c41b4830e4a3ab10dd9dfaca35e3fba53911ad6a9c5", "formatVersion": 1, "totalSecs": 2237},
    "double-dqn.html": {"audio": "podcasts/double-dqn-walkthrough.mp3?v=eb15fc08", "sidecar": "podcasts/double-dqn-walkthrough-sidecar.json?v=eb15fc08", "script": "podcasts/double-dqn-walkthrough-script.json?v=eb15fc08", "version": "eb15fc08", "fingerprint": "4ffc45b05c4b6ebe22a9cb141f78fe042f2551de8c06658617eef03238c6fa03", "formatVersion": 1, "totalSecs": 1327},
    "dpo.html": {"audio": "podcasts/dpo-walkthrough.mp3?v=3bae34bd", "sidecar": "podcasts/dpo-walkthrough-sidecar.json?v=3bae34bd", "script": "podcasts/dpo-walkthrough-script.json?v=3bae34bd", "version": "3bae34bd", "fingerprint": "f65f1ec17d50fc860ed53b6fe3ae1add96784a3f1d77e8f9b43be8509c4f6098", "formatVersion": 1, "totalSecs": 2285},
    "dqn.html": {"audio": "podcasts/dqn-walkthrough.mp3?v=8717c54c", "sidecar": "podcasts/dqn-walkthrough-sidecar.json?v=8717c54c", "script": "podcasts/dqn-walkthrough-script.json?v=8717c54c", "version": "8717c54c", "fingerprint": "ecb8a49d6987e0eed059bd1a5bd46e499bdef3f98052a39d8d03f4d2c3590923", "formatVersion": 1, "totalSecs": 1428},
    "dueling-dqn.html": {"audio": "podcasts/dueling-dqn-walkthrough.mp3?v=b6f9522f", "sidecar": "podcasts/dueling-dqn-walkthrough-sidecar.json?v=b6f9522f", "script": "podcasts/dueling-dqn-walkthrough-script.json?v=b6f9522f", "version": "b6f9522f", "fingerprint": "2f740d7a656af5fcb1101d3bbe0261091b0da0b5ddcdaebf6ae5081ea25f1b51", "formatVersion": 1, "totalSecs": 1635},
    "grpo.html": {"audio": "podcasts/grpo-walkthrough.mp3?v=dc0b1744", "sidecar": "podcasts/grpo-walkthrough-sidecar.json?v=dc0b1744", "script": "podcasts/grpo-walkthrough-script.json?v=dc0b1744", "version": "dc0b1744", "fingerprint": "22aec5039056fefe8083241f612a6b0230d2d057da46f460e61cefab36743408", "formatVersion": 1, "totalSecs": 2637},
    "ppo.html": {"audio": "podcasts/ppo-walkthrough.mp3?v=fa6afcbd", "sidecar": "podcasts/ppo-walkthrough-sidecar.json?v=fa6afcbd", "script": "podcasts/ppo-walkthrough-script.json?v=fa6afcbd", "version": "fa6afcbd", "fingerprint": "d42fa3a988500ebc7908500729ec2686af80f6f9869414375ed6d2e55bae2eb3", "formatVersion": 1, "totalSecs": 2001},
    "q-learning.html": {"audio": "podcasts/q-learning-walkthrough.mp3?v=238c7099", "sidecar": "podcasts/q-learning-walkthrough-sidecar.json?v=238c7099", "script": "podcasts/q-learning-walkthrough-script.json?v=238c7099", "version": "238c7099", "fingerprint": "2d181d6fdfa0a0bdbd53bab98ba03c18e1aed010920c1f33d3e7613ee3e6ebfd", "formatVersion": 1, "totalSecs": 1776},
    "reinforce.html": {"audio": "podcasts/reinforce-walkthrough.mp3?v=630f0281", "sidecar": "podcasts/reinforce-walkthrough-sidecar.json?v=630f0281", "script": "podcasts/reinforce-walkthrough-script.json?v=630f0281", "version": "630f0281", "fingerprint": "d273b7de4d2139fe05e29bb36132d13f7910710246a1a96d217cbf237f7953eb", "formatVersion": 1, "totalSecs": 1848},
    "reward-models.html": {"audio": "podcasts/reward-models-walkthrough.mp3?v=4188ced0", "sidecar": "podcasts/reward-models-walkthrough-sidecar.json?v=4188ced0", "script": "podcasts/reward-models-walkthrough-script.json?v=4188ced0", "version": "4188ced0", "fingerprint": "f8e53e3d2ffcda71f036c9ab31a11894ab08713984a54946c8113aa536654453", "formatVersion": 1, "totalSecs": 1553},
    "rl-alignment.html": {"audio": "podcasts/rl-alignment-walkthrough.mp3?v=cdcdb535", "sidecar": "podcasts/rl-alignment-walkthrough-sidecar.json?v=cdcdb535", "script": "podcasts/rl-alignment-walkthrough-script.json?v=cdcdb535", "version": "cdcdb535", "fingerprint": "4ac373c07db5bae82f5a9b4ea23c0c9f83258f3deae6b8c0f0f5ae2474a6deb9", "formatVersion": 1, "totalSecs": 1593},
    "rl-continuous-actions.html": {"audio": "podcasts/rl-continuous-actions-walkthrough.mp3?v=4c3b0bcb", "sidecar": "podcasts/rl-continuous-actions-walkthrough-sidecar.json?v=4c3b0bcb", "script": "podcasts/rl-continuous-actions-walkthrough-script.json?v=4c3b0bcb", "version": "4c3b0bcb", "fingerprint": "6eb6bc34527a4aacbe76a4c045dc13b730501e740171e790e570cf905d1f0aee", "formatVersion": 1, "totalSecs": 962},
    "rl-methods.html": {"audio": "podcasts/rl-methods-walkthrough.mp3?v=becee38f", "sidecar": "podcasts/rl-methods-walkthrough-sidecar.json?v=becee38f", "script": "podcasts/rl-methods-walkthrough-script.json?v=becee38f", "version": "becee38f", "fingerprint": "9639dd109f8ecbebf7f02fcde383a3b12f083123fe30e19b24c650f98e2bb2b9", "formatVersion": 1, "totalSecs": 1544},
    "rl-model-based.html": {"audio": "podcasts/rl-model-based-walkthrough.mp3?v=25ec2df3", "sidecar": "podcasts/rl-model-based-walkthrough-sidecar.json?v=25ec2df3", "script": "podcasts/rl-model-based-walkthrough-script.json?v=25ec2df3", "version": "25ec2df3", "fingerprint": "58f853077217ab69a66baea4a64e93f2aa08663e84e89da8bd88916e87ba3661", "formatVersion": 1, "totalSecs": 1565},
    "rl-policy-gradients.html": {"audio": "podcasts/rl-policy-gradients-walkthrough.mp3?v=0207c126", "sidecar": "podcasts/rl-policy-gradients-walkthrough-sidecar.json?v=0207c126", "script": "podcasts/rl-policy-gradients-walkthrough-script.json?v=0207c126", "version": "0207c126", "fingerprint": "ca28c2fe39090e0be2761166e06f7322691d74ca5dbab097f359cf5ed1cf6eaf", "formatVersion": 1, "totalSecs": 2051},
    "rl.html": {"audio": "podcasts/rl-walkthrough.mp3?v=14ce25fd", "sidecar": "podcasts/rl-walkthrough-sidecar.json?v=14ce25fd", "script": "podcasts/rl-walkthrough-script.json?v=14ce25fd", "version": "14ce25fd", "fingerprint": "0a0c27d9f866aceeae6f131621918d09f2b9ccbc2a6b217bed2a0e566e72bf54", "formatVersion": 1, "totalSecs": 2477},
    "rlaif.html": {"audio": "podcasts/rlaif-walkthrough.mp3?v=43a41582", "sidecar": "podcasts/rlaif-walkthrough-sidecar.json?v=43a41582", "script": "podcasts/rlaif-walkthrough-script.json?v=43a41582", "version": "43a41582", "fingerprint": "7fb50cc431c94238e044dad9896bb1c2aee6f0ac5754687624b4aaf1a9da26c1", "formatVersion": 1, "totalSecs": 1864},
    "rlhf.html": {"audio": "podcasts/rlhf-walkthrough.mp3?v=d21a46a6", "sidecar": "podcasts/rlhf-walkthrough-sidecar.json?v=d21a46a6", "script": "podcasts/rlhf-walkthrough-script.json?v=d21a46a6", "version": "d21a46a6", "fingerprint": "d9a467bc9c838335a8da40a800e1110a1e47dc8cd0d9bf31aef62cdcf46441bf", "formatVersion": 1, "totalSecs": 1954},
    "sarsa.html": {"audio": "podcasts/sarsa-walkthrough.mp3?v=7057264b", "sidecar": "podcasts/sarsa-walkthrough-sidecar.json?v=7057264b", "script": "podcasts/sarsa-walkthrough-script.json?v=7057264b", "version": "7057264b", "fingerprint": "f832d504d4b21faad8e98809fe9a8f7ed4bb6ba625656d108ea51edebea714b9", "formatVersion": 1, "totalSecs": 1519}
  };
  /* WALKTHROUGHS-END */

  var SELF = document.currentScript;
  var BASE = (SELF && SELF.src) || document.baseURI;
  var FORMAT_VERSION = 1;
  var MAX_TOTAL_SECS = 4320;
  var SIDE_GATE_MS = 3000;
  var STALE_GATE_MS = 5000;
  var OUTER_MS = 10000;
  var RESUME_MIN_SECS = 5;
  var SPEEDS = [1.0, 1.1, 1.2];
  var SPEED_KEY = 'wt:speed';
  var MIN_KEY = 'wt:minimized';
  var MUSIC_KEY = 'wt:music';
  /* Background music, Ramin 2026-11-27: user-selected, behind the
     narration to mask voice artifacts. Fixed volume 0.3 of the
     narration volume, always at default speed, loops, music-only
     mute. The first option plays by default; the choice and the
     mute persist across sessions like the speed. */
  var MUSIC_VOLUME = 0.3;
  var MUSIC_TRACKS = [
    { title: 'Gravity of the Bow', file: 'gravity-of-the-bow.mp3' },
    { title: 'Beneath the Frozen Weight', file: 'beneath-the-frozen-weight.mp3' },
    { title: 'The Architect\'s Calm', file: 'the-architects-calm.mp3' },
    { title: 'The Quiet Arrival', file: 'the-quiet-arrival.mp3' },
    { title: 'Silk Thread and Wood', file: 'silk-thread-and-wood.mp3' },
    { title: 'The Unyielding Stance', file: 'the-unyielding-stance.mp3' },
    { title: 'Iron Mountain Ascent', file: 'iron-mountain-ascent.mp3' },
    { title: 'Beneath the Frozen Peak', file: 'beneath-the-frozen-peak.mp3' },
    { title: 'Before the Cold Dawn', file: 'before-the-cold-dawn.mp3' }
  ];
  var WORST_PODCAST = 'Resume podcast (27:55 of 28 min)';
  var WORST_WALKTHROUGH = 'Resume walkthrough (71:55 of 72 min)';
  var WORST_NOTEBOOKLM = 'Listen on NotebookLM Opens in NotebookLM.';

  var CSS =
    '.pc-row{margin:.5rem 0 .75rem;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .6rem;color-scheme:light;' +
    'border:1px solid #1f618d;border-radius:8px;padding:.6rem .7rem;background:#f8f9fa}' +
    '.pc-row>span{display:block;min-width:0}' +
    '.pc-row>span .pc-btn{width:100%}' +
    '.pc-btn{display:inline-flex;align-items:center;gap:.35em;min-height:44px;padding:.45rem .7rem;' +
    'font:inherit;font-size:1rem;line-height:1.2;white-space:normal;max-width:100%;text-align:left;cursor:pointer;' +
    'color:#1f618d;background:#fff;border:1px solid #1f618d;border-radius:8px}' +
    '@media (hover:hover){.pc-btn:hover{background:#eef4f9}}' +
    '.pc-btn:focus-visible,.pc-row audio:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.pc-btn svg{width:.8em;height:.8em;flex:none}' +
    '.pc-btn[disabled]{opacity:.6;cursor:default}' +
    '.pc-row audio{width:100%;max-width:560px;height:44px}' +
    '.pc-msg{color:#333}' +
    '@media (max-width:640px){.pc-row{flex-direction:column;align-items:stretch}.pc-row>span{width:100%}.wt-music select{flex:1 1 auto;min-width:0}}' +
    '@media print{.pc-row{display:none}.wt-marker{display:none!important}.wt-section-current{outline:none!important}.wt-bar{display:none!important}.wt-sheet{display:none!important}.wt-panel{display:none!important}}' +
    '.wt-section-current{outline:2px solid #d97706;outline-offset:2px}' +
    '.wt-marker{position:absolute;width:12px;height:12px;pointer-events:none;z-index:54;color:inherit}' +
    '.wt-marker svg{width:12px;height:12px;display:block}' +
    '.wt-bar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;color:#111;' +
    'border-top:1px solid #999;padding:.5rem .75rem;display:flex;flex-direction:column;gap:.4rem;align-items:stretch;' +
    'font:inherit;font-size:1rem;line-height:1.3;box-sizing:border-box}' +
    '.wt-bar button{font:inherit;cursor:pointer;background:#fff;color:#1f618d;border:1px solid #1f618d;border-radius:8px;padding:.35rem .6rem;min-height:36px;touch-action:manipulation}' +
    '.wt-bar button[disabled]{opacity:.5;cursor:default}' +
    '.wt-bar button.wt-music-muted{opacity:.55}' +
    '.wt-bar button:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-bar-main{display:flex;flex-wrap:nowrap;gap:.4rem .6rem;align-items:center;min-width:0}' +
    '.wt-bar-main button{flex:none}' +
    '.wt-bar-mid{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:.2rem;justify-content:center}' +
    '.wt-bar-chaptime{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:.95rem;line-height:1.2}' +
    '.wt-bar-track{height:6px;background:#aeb9c2;border-radius:2px;overflow:hidden}' +
    '.wt-bar-trackfill{display:block;height:100%;width:0%;background:#1f618d}' +
    '.wt-bar-msg{padding:.2rem 0}' +
    '.wt-bar-save{font-size:.8rem;color:#1f618d;padding:.1rem 0 0}' +
    '.wt-bar.wt-min .wt-bar-save{display:none}' +
    '.wt-saved{font-size:.85rem;color:#1f618d}' +
    '.wt-music{display:flex;align-items:center;gap:.5rem;min-width:0}' +
    '.wt-music label{color:#1f618d;white-space:nowrap}' +
    '.wt-music select{font:inherit;color:#1f618d;background:#fff;border:1px solid #1f618d;border-radius:8px;padding:.45rem .5rem;min-height:44px;cursor:pointer;max-width:100%}' +
    '.wt-music select:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-bar-elem{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:30vw}' +
    '.wt-bar-pos{white-space:nowrap;font-variant-numeric:tabular-nums;flex:none}' +
    '.wt-bar-speed{font:inherit;color:#1f618d;background:#fff;border:1px solid #1f618d;border-radius:8px;padding:.35rem .3rem;min-height:36px;cursor:pointer;flex:none}' +
    '.wt-bar-speed:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-bar-row3{display:flex;gap:.5rem;flex-wrap:wrap}' +
    '.wt-bar.wt-min .wt-bar-main>*:not(.wt-bar-minbtn){display:none}' +
    /* When minimized only the triangle shows. Play, Resume and Skip go
       too, so a tap aimed at Next can never hit a shrunken control, and
       the bar is just the triangle to expand it back. Pin it to the far
       right so it never sits where a transport button sat. */
    '.wt-bar.wt-min .wt-bar-minbtn{margin-left:auto}' +
    '.wt-bar.wt-min .wt-bar-row3{display:none!important}' +
    '.wt-bar.wt-min{padding:.25rem .5rem}' +
    '.wt-bar.wt-min .wt-bar-minbtn{min-height:28px;padding:.25rem .5rem}' +
    '.wt-bar .wt-short{display:none}' +
    '@media (max-width:480px){.wt-bar{font-size:.85rem;padding:.4rem .5rem}.wt-bar-main{gap:.3rem .4rem;flex-wrap:wrap}.wt-bar-mid{flex:1 1 100%;order:10}.wt-bar-elem{display:none}.wt-bar button{padding:.3rem .45rem;min-height:32px}.wt-bar-speed{padding:.3rem .2rem;min-height:32px}.wt-bar .wt-full{display:none}.wt-bar .wt-short{display:inline}}' +
    '.wt-sheet{position:fixed;left:0;right:0;z-index:55;background:#fff;color:#111;border-top:1px solid #999;' +
    'max-height:60vh;overflow:auto;padding:1rem;box-sizing:border-box}' +
    '.wt-sheet h2{font-size:1.1rem;margin:.2rem 0 .6rem}' +
    '.wt-sheet ul{list-style:none;margin:0;padding:0}' +
    '.wt-sheet li{margin:.15rem 0}' +
    '.wt-sheet button{font:inherit;cursor:pointer;background:none;border:0;color:#1f618d;text-align:left;padding:.3rem 0}' +
    '.wt-sheet button:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-sheet .wt-sub{padding-left:1.2rem;font-size:.95rem}' +
    '.wt-sheet li.wt-chapter-current{background:#eef4f9;border-left:3px solid #1f618d;padding-left:.4rem}' +
    '.wt-sheet li.wt-chapter-current>button{font-weight:700;color:#111}' +
    '.wt-sheet .wt-now{font-weight:700;color:#1f618d}' +
    '.wt-panel{position:fixed;right:0;z-index:55;background:#fff;color:#111;border-left:1px solid #999;' +
    'width:360px;max-width:100vw;overflow:auto;padding:1rem;box-sizing:border-box}' +
    '.wt-panel h2{font-size:1.1rem;margin:.2rem 0 .6rem}' +
    '.wt-tr-line{margin:.45rem 0;padding-left:.6rem;border-left:3px solid transparent}' +
    '.wt-tr-line.wt-tr-current{border-left-color:currentColor;font-weight:600}' +
    '.wt-tr-expl{font-size:.9rem;color:#444}' +
    '.wt-tr-tag{font-size:.8rem;color:#1f618d}';

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

  function loadSpeed() {
    var sp = load(SPEED_KEY);
    var r = sp && typeof sp.r === 'number' ? sp.r : 1;
    return SPEEDS.indexOf(r) >= 0 ? r : 1.0;
  }

  function loadMinimized() {
    var m = load(MIN_KEY);
    return !!(m && m.m === true);
  }

  /* ---------- background music (Ramin, 2026-11-27) ---------- */

  function loadMusic() {
    var m = load(MUSIC_KEY);
    var track = (m && typeof m.t === 'number') ? m.t : 0;
    if (track < 0 || track >= MUSIC_TRACKS.length) track = 0;
    return { track: track, muted: !!(m && m.m === true) };
  }

  function saveMusic() {
    save(MUSIC_KEY, { t: state.musicTrack, m: state.musicMuted });
  }

  function musicUrl(i) {
    try { return new URL('podcasts/music/' + MUSIC_TRACKS[i].file, BASE).href; } catch (e) { return ''; }
  }

  /* The music element is detached, loops, and plays at a fixed 0.3
     volume. Its speed is never touched: the walkthrough speed control
     only ever sets state.audio.playbackRate, never this element. */
  function createMusicAudio() {
    var m = document.createElement('audio');
    m.preload = 'none';
    m.loop = true;
    m.volume = MUSIC_VOLUME;
    m.setAttribute('aria-label', 'Background music');
    var src = musicUrl(state.musicTrack);
    if (!src) return null;
    m.src = src;
    /* Music failure is silent and never touches the narration: a
       missing or uncached track offline just means no music. */
    m.addEventListener('error', function () { /* silent */ });
    state.musicAudio = m;
    return m;
  }

  /* Music follows the narration: it plays only while the narration
     plays and is unmuted, and pauses the moment the narration pauses
     or ends. Called from the narration play, pause and ended
     handlers, so every play path (bar, top button, resume) syncs it. */
  function syncMusic() {
    var m = state.musicAudio;
    if (!m) {
      if (state.musicMuted || !state.audio || state.audio.paused) return;
      m = createMusicAudio();
      if (!m) return;
    }
    if (state.musicMuted || !state.audio || state.audio.paused || state.audio.ended) {
      m.pause();
      return;
    }
    var p = m.play();
    if (p && p.catch) p.catch(function () { /* autoplay block: the next play gesture retries */ });
  }

  function selectMusic(i) {
    if (i < 0 || i >= MUSIC_TRACKS.length) return;
    state.musicTrack = i;
    saveMusic();
    if (state.musicSel) state.musicSel.value = String(i);
    var m = state.musicAudio;
    if (!m) return;
    var src = musicUrl(i);
    if (!src || m.src === src) return;
    var wasPlaying = state.audio && !state.audio.paused && !state.musicMuted;
    m.src = src;
    if (wasPlaying) {
      var p = m.play();
      if (p && p.catch) p.catch(function () { /* silent */ });
    }
  }

  function updateMusicMuteBtn() {
    var b = state.musicMuteBtn;
    if (!b) return;
    var full = b.querySelector('.wt-full');
    var short = b.querySelector('.wt-short');
    if (full) full.textContent = state.musicMuted ? 'Muted' : 'Music';
    if (short) short.textContent = '♪';
    b.classList.toggle('wt-music-muted', state.musicMuted);
    b.setAttribute('aria-pressed', state.musicMuted ? 'true' : 'false');
    b.setAttribute('aria-label', state.musicMuted ? 'Unmute background music' : 'Mute background music');
  }

  function toggleMusicMute() {
    state.musicMuted = !state.musicMuted;
    saveMusic();
    updateMusicMuteBtn();
    syncMusic();
  }

  /* The picker sits in the top audio row, after the walkthrough
     button: a label and a select with all nine tracks by name. */
  function showMusicRow(wtSpan) {
    var row = wtSpan && wtSpan.parentNode;
    if (!row || state.musicSel) return;
    var span = makeSpan('music');
    var wrap = document.createElement('div');
    wrap.className = 'wt-music';
    var lab = document.createElement('label');
    lab.textContent = 'Music';
    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Background music');
    MUSIC_TRACKS.forEach(function (t, i) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = t.title;
      sel.appendChild(opt);
    });
    sel.value = String(state.musicTrack);
    sel.addEventListener('change', function () {
      selectMusic(parseInt(sel.value, 10));
    });
    wrap.appendChild(lab);
    wrap.appendChild(sel);
    span.appendChild(wrap);
    if (wtSpan.nextSibling) row.insertBefore(span, wtSpan.nextSibling);
    else row.appendChild(span);
    state.musicSel = sel;
  }

  function svgTriangle() {
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

  function svgPlay() { return svgTriangle(); }

  function button(text, withIcon) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pc-btn';
    if (withIcon) b.appendChild(svgPlay());
    b.appendChild(document.createTextNode(text));
    return b;
  }

  function anchorAfter(h1) {
    var n = h1.nextElementSibling;
    if (n && n.tagName === 'P' && (n.classList.contains('dek') || n.classList.contains('subtitle'))) return n;
    return h1;
  }

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      var bytes = new Uint8Array(buf);
      var out = '';
      for (var i = 0; i < bytes.length; i++) out += ('0' + bytes[i].toString(16)).slice(-2);
      return out;
    });
  }

  /* ---------- readable units and fingerprints (plan section 4) ---------- */

  var IGNORED_SEL = 'pre,script,noscript,style,textarea,option,svg,.no-math,.katex';

  function stripMath(text) {
    var out = '';
    var i = 0;
    while (i < text.length) {
      var paren = text.indexOf('\\(', i);
      var bracket = text.indexOf('\\[', i);
      var next = -1;
      var close = '';
      if (paren >= 0 && (bracket < 0 || paren < bracket)) { next = paren; close = '\\)'; }
      else if (bracket >= 0) { next = bracket; close = '\\]'; }
      if (next < 0) { out += text.slice(i); break; }
      out += text.slice(i, next);
      var end = text.indexOf(close, next + 2);
      if (end < 0) { out += text.slice(next); break; }
      i = end + 2;
    }
    return out;
  }

  function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim().normalize('NFC');
  }

  function fingerprintInput(el, kind) {
    if (kind === 'code') return normalizeText(el.textContent || '');
    var clone = el.cloneNode(true);
    var bad = clone.querySelectorAll(IGNORED_SEL);
    for (var i = bad.length - 1; i >= 0; i--) {
      var node = bad[i];
      if (node.parentNode) node.parentNode.removeChild(node);
    }
    return normalizeText(stripMath(clone.textContent || ''));
  }

  function fingerprintHash(el, kind) {
    return sha256Hex(fingerprintInput(el, kind));
  }

  function inReferences(el, refH2) {
    if (!refH2) return false;
    var node = el;
    var seen = false;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    var cur = walker.nextNode();
    while (cur) {
      if (cur === refH2) seen = true;
      else if (seen && cur.tagName === 'H2') seen = false;
      if (cur === el) return seen;
      cur = walker.nextNode();
    }
    return false;
  }

  function sectionIndexOf(el, h2s) {
    var idx = 0;
    for (var i = 0; i < h2s.length; i++) {
      if (h2s[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) idx = i + 1;
      else break;
    }
    return idx;
  }

  /* Enumerate every readable unit in document order, with the manifest id
     scheme: prose s6-p3, figure s6-f1, equation s6-e2, labeled eqwhy
     s6-e2-l1, unlabeled eqwhy s6-e2-worked, code s6-c1, table s6-t1,
     tool s6-d1, step list s6-s1, subhead s6-h1, section title s6-title. */
  function enumerateUnits() {
    var h1 = document.querySelector('h1');
    var h2s = Array.prototype.slice.call(document.querySelectorAll('h2'));
    var refH2 = null;
    for (var i = 0; i < h2s.length; i++) if (h2s[i].id === 'references') refH2 = h2s[i];
    var units = [];
    var counters = {};
    function nextCount(section, kind) {
      var k = section + ':' + kind;
      counters[k] = (counters[k] || 0) + 1;
      return counters[k];
    }
    function push(unit) { units.push(unit); }
    function closest(el, sel) {
      var n = el;
      while (n) {
        if (n.nodeType === 1 && n.matches && n.matches(sel)) return n;
        n = n.parentNode;
      }
      return null;
    }
    function isIn(el, sel) { return !!closest(el, sel); }

    if (h1) push({ id: 's0-title', kind: 'section_title', section: 0, ordinal: 1, el: h1, domId: h1.id || null });
    var all = document.querySelectorAll('p,figure,div.eq-card,pre,table,div.demo,ol,ul,h2,h3,div.eq-why');
    for (var u = 0; u < all.length; u++) {
      var el = all[u];
      var tag = el.tagName;
      if (isIn(el, '.wt-ui')) continue;
      if (tag === 'H2') {
        var sec = h2s.indexOf(el) + 1;
        if (sec < 1) continue;
        push({ id: 's' + sec + '-title', kind: 'section_title', section: sec, ordinal: 1, el: el, domId: el.id || null });
        continue;
      }
      if (tag === 'H3') {
        var s3 = sectionIndexOf(el, h2s);
        var n3 = nextCount(s3, 'subhead');
        push({ id: 's' + s3 + '-h' + n3, kind: 'subhead', section: s3, ordinal: n3, el: el, domId: el.id || null });
        continue;
      }
      if (tag === 'P') {
        if (el.classList.contains('crumb') || el.classList.contains('tabs-label')) continue;
        if (isIn(el, 'nav') || isIn(el, 'figure') || isIn(el, 'figcaption') || isIn(el, '.demo') || isIn(el, 'table') || isIn(el, '.wt-ui')) continue;
        /* A p.eq-what inside a card is already pushed by the card branch
           before the math lines, so it keeps its document position; the
           P branch must not push it a second time. */
        if (el.classList.contains('eq-what') && isIn(el, 'div.eq-card')) continue;
        if (inReferences(el, refH2)) continue;
        var sp = sectionIndexOf(el, h2s);
        var np = nextCount(sp, 'prose');
        push({ id: 's' + sp + '-p' + np, kind: 'prose', section: sp, ordinal: np, el: el, domId: null });
        continue;
      }
      if (tag === 'FIGURE') {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var sf = sectionIndexOf(el, h2s);
        var nf = nextCount(sf, 'figure');
        push({ id: 's' + sf + '-f' + nf, kind: 'figure', section: sf, ordinal: nf, el: el, domId: el.id || null });
        continue;
      }
      if (tag === 'PRE') {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var sc = sectionIndexOf(el, h2s);
        var nc = nextCount(sc, 'code');
        push({ id: 's' + sc + '-c' + nc, kind: 'code', section: sc, ordinal: nc, el: el, domId: null });
        continue;
      }
      if (tag === 'TABLE') {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var st = sectionIndexOf(el, h2s);
        var nt = nextCount(st, 'table');
        push({ id: 's' + st + '-t' + nt, kind: 'table', section: st, ordinal: nt, el: el, domId: null });
        continue;
      }
      if (tag === 'OL' || tag === 'UL') {
        if (closest(el, 'nav')) continue;
        if (inReferences(el, refH2)) continue;
        if (isIn(el, '.wt-ui')) continue;
        var ss = sectionIndexOf(el, h2s);
        var ns = nextCount(ss, 'step_list');
        push({ id: 's' + ss + '-s' + ns, kind: 'step_list', section: ss, ordinal: ns, el: el, domId: null });
        continue;
      }
      if (el.classList.contains('demo')) {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var sd = sectionIndexOf(el, h2s);
        var nd = nextCount(sd, 'tool');
        push({ id: 's' + sd + '-d' + nd, kind: 'tool', section: sd, ordinal: nd, el: el, domId: el.id || null });
        continue;
      }
      if (el.classList.contains('eq-card')) {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var se = sectionIndexOf(el, h2s);
        var ne = nextCount(se, 'equation');
        push({ id: 's' + se + '-e' + ne, kind: 'equation', section: se, ordinal: ne, el: el, domId: el.id || null, cardOrdinal: ne });
        /* The card's lead-in is a prose paragraph the sidecar counts, so
           it is a prose unit with the next prose ordinal in this section,
           taken here before the math lines so it keeps its document
           position. The lead-in may be a div or a p; either form is taken
           here, and the P branch below skips a p.eq-what inside a card,
           so it is counted once. Before this the p form was collected by
           the P branch after the card's lines were pushed as a group, so
           it sat after the lines in the unit list and Previous from it
           stepped to a math line instead of the prose before the card. */
        var what = el.querySelector('.eq-what');
        if (what) {
          var nw = nextCount(se, 'prose');
          push({ id: 's' + se + '-p' + nw, kind: 'prose', section: se, ordinal: nw, el: what, domId: null });
        }
        /* One unit per math line inside the card, so an equation segment
           can point the marker at the line itself instead of the card as
           a whole. The id is deliberately not a manifest id: the manifest
           keys the card (s2-e1) and the eq-why divs (s2-e1-l1), so the
           hash check skips these line units. */
        var cardLines = el.querySelectorAll('.eq-line');
        for (var li = 0; li < cardLines.length; li++) {
          var lineEl = cardLines[li];
          var ln = lineEl.querySelector('.eq-ln');
          var lineNo = ln ? (ln.textContent || '').trim() : String(li + 1);
          push({ id: 's' + se + '-e' + ne + '-line' + lineNo, kind: 'equation', section: se, ordinal: ne, el: lineEl, domId: lineEl.id || null, cardOrdinal: ne, cardDomId: el.id || null, eqLine: lineNo });
        }
        continue;
      }
      if (el.classList.contains('eq-why')) {
        if (isIn(el, 'nav') || isIn(el, '.wt-ui')) continue;
        var card = closest(el, 'div.eq-card');
        var swe = sectionIndexOf(el, h2s);
        var cardOrd = 0;
        if (card) {
          var cards = Array.prototype.slice.call(document.querySelectorAll('div.eq-card'));
          var inSec = cards.filter(function (c) { return sectionIndexOf(c, h2s) === swe; });
          cardOrd = inSec.indexOf(card) + 1;
        }
        var line = el.getAttribute('data-eqline') || '';
        var strongs = el.querySelectorAll('strong');
        var labels = [];
        for (var li = 0; li < strongs.length; li++) labels.push((strongs[li].textContent || '').trim());
        /* The site writes the labels with a trailing period (Intuition.,
           The mathematics., Example.), so strip it before comparing, or
           every labeled eq-why div is misread as an unlabeled worked
           example, they all share one id, and the paragraphId hash lookup
           can only ever match the last one. */
        var labeled = labels.some(function (t) {
          var n = (t || '').replace(/\.\s*$/, '');
          return n === 'Intuition' || n === 'The mathematics' || n === 'Example';
        });
        var wid = labeled ? ('s' + swe + '-e' + cardOrd + '-l' + line) : ('s' + swe + '-e' + cardOrd + '-worked');
        push({ id: wid, kind: 'eqwhy', section: swe, ordinal: nextCount(swe, 'eqwhy'), el: el, domId: null, cardOrdinal: cardOrd, eqLine: line, labeled: labeled, labels: labels });
        continue;
      }
    }
    return units;
  }

  /* ---------- state ---------- */

  var state = {
    entry: null,
    sidecar: null,
    slug: null,
    units: [],
    unitsById: {},
    hashes: null,
    hashVerified: false,
    audio: null,
    playing: false,
    loading: false,
    speed: 1.0,
    musicAudio: null,
    musicTrack: 0,
    musicMuted: false,
    musicSel: null,
    musicMuteBtn: null,
    currentSeg: null,
    currentSection: -1,
    following: true,
    progScroll: false,
    scrollTimer: 0,
    markerEl: null,
    markedEl: null,
    outlinedEl: null,
    resizeObs: null,
    rafId: 0,
    lastTime: 0,
    lastSave: 0,
    tryIt: null,
    tryItFiredAt: -1,
    bar: null,
    barMid: null,
    barMidTime: null,
    barMidFill: null,
    chapterStart: 0,
    chapterEnd: 0,
    barElem: null,
    barPos: null,
    barPlay: null,
    barBack: null,
    barNext: null,
    stepStops: null,
    liCache: null,
    scrollGen: 0,
    refUnits: {},
    barMinBtn: null,
    barSpeed: null,
    minimized: false,
    row3: null,
    chaptersSheet: null,
    transcriptPanel: null,
    transcriptData: null,
    transcriptLoaded: false,
    validationDone: false,
    savedShown: false,
    savedEl: null,
    barSave: null,
    barMidTotal: null,
    saveState: 'none',
    saveListenersAdded: false,
    chapterItems: null,
    currentChapterIdx: -1,
    swReg: null,
    firstPlayPending: false,
    persistRequested: false,
    offlineMsgShown: false,
  };

  function slugKey() { return 'wt:pos:' + (state.slug || ''); }

  function elementNameFor(seg, unit) {
    if (!seg) return '';
    var kind = seg.kind || (unit && unit.kind) || '';
    // A bare fig-N id reads as jargon in the bar; show Figure N instead.
    // The same holds for any short cryptic figure id (q-floor, q-big):
    // a reader cannot tell what it names, so it shows as Figure N,
    // numbered by the figure's position among the page's figures.
    // Descriptive ids (q-table-figure) keep their name.
    if (kind === 'figure') {
      var el = seg.element || '';
      var m = /^fig-(\d+)$/.exec(el);
      if (m) return 'Figure ' + m[1];
      if (el && el.length < 8) {
        var n = 0;
        if (unit && state.units) {
          for (var i = 0; i < state.units.length; i++) {
            if (state.units[i].kind === 'figure') n++;
            if (state.units[i] === unit) break;
          }
        }
        return n > 0 ? 'Figure ' + n : 'Figure';
      }
      return el || 'Figure';
    }
    if (kind === 'equation' || kind === 'eqwhy' || kind === 'intuition' || kind === 'example') return seg.element || 'Equation';
    if (kind === 'code') return 'Code';
    if (kind === 'table') return seg.element || 'Table';
    if (kind === 'tool') return 'Demo';
    if (kind === 'step_list') return 'Steps';
    /* A section title is the chapter title, and the bar carries no
       chapter title text, so a title segment names nothing here. */
    if (kind === 'section_title' || kind === 'subhead') return '';
    return '';
  }

  /* ---------- service worker: offline playback ---------- */

  var OFFLINE_MSG = 'This walkthrough is not saved on this device yet. Play it once while online and it will be saved for offline listening.';

  function audioUrl() {
    try { return new URL(state.entry.audio, BASE).href; } catch (e) { return ''; }
  }

  /* Register wt-sw.js at the site root. Silent failure: a browser
     without service worker support, or a failed registration, plays
     from the network exactly as today. */
  function registerWorker() {
    try {
      if (!('serviceWorker' in navigator)) return;
      state.swReg = navigator.serviceWorker.register(new URL('wt-sw.js', BASE).href, { scope: '/', updateViaCache: 'none' });
      state.swReg.catch(function () { /* silent */ });
      navigator.serviceWorker.addEventListener('message', onWorkerMessage);
      navigator.serviceWorker.addEventListener('controllerchange', function () { askCachedOnInit(); });
    } catch (e) { /* silent */ }
  }

  /* Wait briefly for the worker to control this page before a first
     play, so the first play caches. At most 3 seconds; on timeout, or
     with no registration, play proceeds from the network exactly as
     today. Never blocks the button: the caller waits async. */
  function waitForWorkerReady() {
    if (!state.swReg) return Promise.resolve(false);
    var deadline = Date.now() + 3000;
    return new Promise(function (resolve) {
      var settled = false;
      function done(v) { if (!settled) { settled = true; resolve(v); } }
      function controllerPresent() {
        try { return !!(navigator.serviceWorker && navigator.serviceWorker.controller); } catch (e) { return false; }
      }
      (function poll() {
        if (controllerPresent()) { done(true); return; }
        if (Date.now() >= deadline) { done(false); return; }
        setTimeout(poll, 100);
      })();
      state.swReg.then(function (reg) {
        if (reg && reg.active) return;
        if (navigator.serviceWorker) {
          navigator.serviceWorker.ready.then(function () { /* poll keeps checking */ }, function () { done(false); });
        } else done(false);
      }, function () { done(false); });
    });
  }

  /* Ask the worker whether the current walkthrough is cached. Resolves
     true, false, or null (no worker, or no answer within the timeout).
     No ask ever blocks playback. */
  function askWorkerCached(url, timeoutMs) {
    return new Promise(function (resolve) {
      var done = false;
      function finish(v) { if (!done) { done = true; resolve(v); } }
      var timer = setTimeout(function () { finish(null); }, timeoutMs);
      try {
        if (!('serviceWorker' in navigator) || !navigator.serviceWorker) { clearTimeout(timer); finish(null); return; }
        var target = navigator.serviceWorker.controller;
        if (target) { sendAsk(target); return; }
        navigator.serviceWorker.ready.then(function (reg) {
          if (reg && reg.active) sendAsk(reg.active); else finish(null);
        }, function () { finish(null); });
        function sendAsk(t) {
          try {
            var ch = new MessageChannel();
            ch.port1.onmessage = function (e) {
              clearTimeout(timer);
              finish(e.data && e.data.cached === true);
            };
            t.postMessage({ type: 'wt-cached?', url: url }, [ch.port2]);
          } catch (e) { finish(null); }
        }
      } catch (e) { finish(null); }
    });
  }

  /* Tell the worker this walkthrough is playing, so eviction is
     least-recently-played. Fire and forget. */
  function tellWorkerPlaying() {
    try {
      var url = audioUrl();
      if (!url || !('serviceWorker' in navigator) || !navigator.serviceWorker) return;
      var t = navigator.serviceWorker.controller;
      if (t) t.postMessage({ type: 'wt-playing', url: url });
    } catch (e) { /* silent */ }
  }

  function requestPersistOnce() {
    if (state.persistRequested) return;
    state.persistRequested = true;
    try {
      if (navigator.storage && navigator.storage.persist) {
        var p = navigator.storage.persist();
        if (p && p.catch) p.catch(function () { /* ignored */ });
      }
    } catch (e) { /* ignored */ }
  }

  /* The save line, in the row and in the bar the listener watches
     while listening. 'Saving...' while the worker caches the audio
     on first play, 'Saved on this device' once it reports cached.
     Offline, the saved line also says so, since offline looks
     identical to online otherwise. */
  function saveLineText(base) {
    if (base === 'Saved on this device' && typeof navigator.onLine === 'boolean' && !navigator.onLine) {
      return 'Saved on this device · Offline';
    }
    return base;
  }

  function setSaveLine(text) {
    if (state.savedEl) state.savedEl.textContent = saveLineText(text);
    if (state.barSave) state.barSave.textContent = saveLineText(text);
  }

  function refreshSaveLine() {
    if (state.saveState === 'saved') setSaveLine('Saved on this device');
    else if (state.saveState === 'saving') setSaveLine('Saving...');
  }

  function showSavingIndicator() {
    if (!state.entry || state.saveState === 'saved') return;
    state.saveState = 'saving';
    var span = document.querySelector('[data-wt-span="walkthrough"]');
    if (!span) return;
    if (!state.savedEl) {
      var d = document.createElement('div');
      d.className = 'wt-saved';
      state.savedEl = d;
    }
    if (!state.savedEl.parentNode) span.appendChild(state.savedEl);
    setSaveLine('Saving...');
  }

  function showSavedIndicator() {
    if (!state.entry) return;
    state.savedShown = true;
    state.saveState = 'saved';
    var span = document.querySelector('[data-wt-span="walkthrough"]');
    if (!span) return;
    if (!state.savedEl) {
      var d = document.createElement('div');
      d.className = 'wt-saved';
      state.savedEl = d;
    }
    if (!state.savedEl.parentNode) span.appendChild(state.savedEl);
    setSaveLine('Saved on this device');
    requestPersistOnce();
  }

  function onWorkerMessage(e) {
    var data = e.data || {};
    if (data.type === 'wt-cached' && data.url === audioUrl()) showSavedIndicator();
  }

  function askCachedOnInit() {
    if (!state.entry) return;
    askWorkerCached(audioUrl(), 3000).then(function (cached) {
      if (cached === true) showSavedIndicator();
    });
  }

  function showOfflineNotSaved() {
    var span = document.querySelector('[data-wt-span="walkthrough"]');
    if (!span) return;
    /* Nothing plays in this state, so the bar reads Play at 0:00,
       never Pause. */
    if (state.barPlay && !state.audio) state.barPlay.textContent = 'Play';
    if (state.offlineMsgShown) return;
    var m = document.createElement('div');
    m.className = 'pc-msg';
    m.textContent = OFFLINE_MSG;
    span.appendChild(m);
    state.offlineMsgShown = true;
  }

  /* ---------- row and spans (plan section 1) ---------- */

  var measurer = null;

  function measureButton(text) {
    if (!measurer) {
      measurer = document.createElement('div');
      measurer.className = 'pc-btn';
      measurer.style.cssText = 'position:absolute;visibility:hidden;left:-9999px;top:0;pointer-events:none';
      document.body.appendChild(measurer);
    }
    measurer.textContent = '';
    measurer.appendChild(svgPlay());
    measurer.appendChild(document.createTextNode(text));
    return measurer;
  }

  function sizeSpan(span, text, row) {
    var rowWidth = row.clientWidth || document.documentElement.clientWidth || 360;
    var m = measureButton(text);
    m.style.maxWidth = '100%';
    m.style.width = 'auto';
    var natural = m.offsetWidth;
    var capped = Math.min(natural, rowWidth);
    m.style.width = capped + 'px';
    var h = Math.max(44, m.offsetHeight);
    span.style.minWidth = capped + 'px';
    span.style.minHeight = h + 'px';
    m.style.width = 'auto';
  }

  function makeSpan(kind) {
    var s = document.createElement('span');
    s.setAttribute('data-wt-span', kind);
    return s;
  }

  function findSpan(row, kind) {
    return row.querySelector('[data-wt-span="' + kind + '"]');
  }

  function removeRowIfEmpty(row) {
    if (row && !row.querySelector('span') && !row.children.length) {
      if (row.parentNode) row.parentNode.removeChild(row);
    }
  }

  function removeSpanNow(span) {
    if (!span || !span.parentNode) return;
    var row = span.parentNode;
    row.removeChild(span);
    removeRowIfEmpty(row);
  }

  /* A removal that becomes due after setup settles waits until the reader
     scrolls the row fully out of view, with no time cap. Where the row is
     already out of view, it fires at once. */
  function removeSpanDeferred(span) {
    if (!span || !span.parentNode) return;
    var row = span.parentNode;
    var r = row.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) { removeSpanNow(span); return; }
    var onScroll = function () {
      var r2 = row.getBoundingClientRect();
      if (r2.bottom < 0 || r2.top > window.innerHeight) {
        window.removeEventListener('scroll', onScroll);
        removeSpanNow(span);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* This player owns only the walkthrough span. It never creates the
     podcast or NotebookLM spans; the podcast player owns those and
     creates them when it runs. Creating the podcast span here left an
     empty 60px span on pages with no podcast episode. The span goes
     after the podcast span when one is there, else before the
     NotebookLM span, else on its own. */
  function ensureRow() {
    var row = document.querySelector('.pc-row');
    if (!row) {
      var h1 = document.querySelector('h1');
      if (!h1) return null;
      row = document.createElement('div');
      row.className = 'pc-row';
      var a = anchorAfter(h1);
      a.parentNode.insertBefore(row, a.nextSibling);
    }
    var wtSpan = findSpan(row, 'walkthrough');
    var justCreated = false;
    if (!wtSpan) {
      wtSpan = makeSpan('walkthrough');
      var pcSpan = findSpan(row, 'podcast');
      var nbSpan = findSpan(row, 'notebooklm');
      if (pcSpan && pcSpan.nextSibling) row.insertBefore(wtSpan, pcSpan.nextSibling);
      else if (pcSpan) row.appendChild(wtSpan);
      else if (nbSpan) row.insertBefore(wtSpan, nbSpan);
      else row.appendChild(wtSpan);
      justCreated = true;
    }
    /* Size only the span this player owns, so a taken-over row is still
       sized from worst-case content. */
    if (!wtSpan.style.minWidth) sizeSpan(wtSpan, WORST_WALKTHROUGH, row);
    if (justCreated) {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          if (!state.validationDone) {
            sizeSpan(wtSpan, WORST_WALKTHROUGH, row);
          }
        });
      }
    }
    return { row: row, wtSpan: wtSpan };
  }

  /* ---------- validation (plan sections 1 and 5) ---------- */

  function fetchOnce(url, opts, timeoutMs) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, timeoutMs);
    var o = opts || {};
    o.signal = ctrl.signal;
    return fetch(url, o).then(function (res) {
      clearTimeout(timer);
      return res;
    }).catch(function (e) {
      clearTimeout(timer);
      throw e;
    });
  }

  /* One retry per gate, whether the retry follows a transient failure or
     a budget abort. A late response from the aborted attempt is ignored. */
  function fetchWithRetry(url, opts, budgetMs) {
    var attempt = 0;
    function tryOnce() {
      attempt++;
      return fetchOnce(url, opts, budgetMs).then(function (res) {
        if (!res.ok) {
          if (attempt < 2) return tryOnce();
          throw new Error('fetch failed with status ' + res.status);
        }
        return res;
      }).catch(function (e) {
        if (attempt < 2) return tryOnce();
        throw e;
      });
    }
    return tryOnce();
  }

  function validateSidecar(entry) {
    var url;
    try { url = new URL(entry.sidecar, BASE).href; } catch (e) { return Promise.reject(new Error('bad sidecar path')); }
    return fetchWithRetry(url, {}, SIDE_GATE_MS).then(function (res) { return res.json(); }).then(function (sc) {
      if (!sc || typeof sc !== 'object') throw new Error('invalid sidecar');
      if (sc.formatVersion !== FORMAT_VERSION || entry.formatVersion !== FORMAT_VERSION) throw new Error('format version mismatch');
      if (typeof sc.totalSeconds !== 'number' || sc.totalSeconds > MAX_TOTAL_SECS) throw new Error('walkthrough over the 72 minute bound');
      if (!Array.isArray(sc.segments) || !sc.segments.length) throw new Error('sidecar has no segments');
      if (!Array.isArray(sc.paragraphs) && !Array.isArray(sc.paragraphManifest)) throw new Error('sidecar has no paragraph manifest');
      if (typeof sc.audioFingerprint !== 'string' || !sc.audioFingerprint) throw new Error('sidecar has no audio fingerprint');
      if (typeof sc.sourceFingerprint !== 'string' || sc.sourceFingerprint !== entry.fingerprint) throw new Error('sidecar fingerprint does not match the registry');
      return sc;
    });
  }

  function validateStale(entry) {
    var url = location.pathname;
    return fetchWithRetry(url, { cache: 'no-store' }, STALE_GATE_MS).then(function (res) { return res.text(); }).then(function (text) {
      return sha256Hex(text);
    }).then(function (hash) {
      if (hash !== entry.fingerprint) throw new Error('page fingerprint mismatch');
      return true;
    });
  }

  function validationFailed(row, wtSpan, reason) {
    console.warn('Walkthrough hidden: ' + reason);
    if (row) row.setAttribute('data-wt-failed', reason);
    /* A fingerprint mismatch is permanent: the page moved, or the sidecar
       no longer matches the registry, so this walkthrough will never load.
       Remove the span at once instead of leaving a "Loading walkthrough…"
       placeholder that waits for scroll-out. Any other failure (a fetch
       that failed, a timeout) stays deferred, so a transient failure
       never causes a layout shift while the reader is looking at the row. */
    if (reason === 'page fingerprint mismatch' || reason === 'sidecar fingerprint does not match the registry') {
      removeSpanNow(wtSpan);
    } else {
      removeSpanDeferred(wtSpan);
    }
  }

  /* ---------- fingerprint precompute (plan section 4) ---------- */

  function scanHasUnrenderedMath() {
    for (var i = 0; i < state.units.length; i++) {
      var u = state.units[i];
      if (u.kind === 'code') continue;
      var text = fingerprintInput(u.el, u.kind);
      if (text.indexOf('\\(') >= 0 || text.indexOf('\\[') >= 0) return true;
    }
    return false;
  }

  function precomputeHashes(verify) {
    var manifest = state.sidecar.paragraphs || state.sidecar.paragraphManifest || [];
    var byId = {};
    for (var i = 0; i < manifest.length; i++) byId[manifest[i].id] = manifest[i];
    var jobs = state.units.map(function (u) {
      return fingerprintHash(u.el, u.kind).then(function (h) { return { id: u.id, hash: h }; });
    });
    return Promise.all(jobs).then(function (pairs) {
      var map = {};
      for (var i = 0; i < pairs.length; i++) map[pairs[i].id] = pairs[i].hash;
      state.hashes = map;
      /* Resolution now prefers the hash, so a step list built before the
         hashes were ready (from id fallbacks) is stale; rebuild it on
         next use. */
      state.stepStops = null;
      state.liCache = null;
      if (!verify) return;
      state.hashVerified = true;
      var seg = state.currentSeg;
      if (seg) {
        /* The hash check names the paragraph's own unit, the list
           itself, not the one item the marker points at. */
        var unit = resolveSegmentBase(seg);
        if (unit) {
          /* The segment names its paragraph; the resolved unit's text
             must match that paragraph's manifest hash, not the hash of
             whatever id the unit happens to carry, or a correctly
             hash-resolved marker is cleared here. */
          var entry = seg.paragraphId ? byId[seg.paragraphId] : byId[unit.id];
          var expected = entry && entry.hash;
          if (expected && map[unit.id] !== expected) {
            var fixed = searchByHash(seg.sectionIndex, expected, unit.ordinal);
            if (fixed) placeMarker(fixed);
            else clearMarker();
          }
        }
      }
    });
  }

  function startPrecompute() {
    var startedAt = Date.now();
    var forced = false;
    function run(verify) {
      precomputeHashes(verify).catch(function () { /* ordinal lookup continues */ });
    }
    function check() {
      if (!scanHasUnrenderedMath()) { run(true); return true; }
      return false;
    }
    if (check()) return;
    var obs = new MutationObserver(function () {
      if (check()) { obs.disconnect(); }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    setTimeout(function () {
      if (state.hashes) return;
      obs.disconnect();
      forced = true;
      console.warn('Walkthrough: unrendered math delimiters remain after 5 seconds, hashing text as it stands without verification.');
      run(false);
      var obs2 = new MutationObserver(function () {
        if (!scanHasUnrenderedMath()) {
          obs2.disconnect();
          run(true);
        }
      });
      obs2.observe(document.body, { childList: true, subtree: true, characterData: true });
    }, 5000);
  }

  function searchByHash(sectionIndex, hash, expectedOrdinal) {
    var best = null;
    var bestDist = Infinity;
    for (var i = 0; i < state.units.length; i++) {
      var u = state.units[i];
      if (u.section !== sectionIndex) continue;
      if (state.hashes && state.hashes[u.id] === hash) {
        var d = Math.abs(u.ordinal - expectedOrdinal);
        if (d < bestDist) { bestDist = d; best = u; }
      }
    }
    return best;
  }

  /* ---------- segment resolution and the marker (plan section 3) ---------- */

  /* Page section of an element: the number of h2 headings before it.
     Section 0 is the intro before the first h2. */
  function pageSectionOf(el) {
    var h2s = document.querySelectorAll('h2');
    var sec = 0;
    for (var i = 0; i < h2s.length; i++) {
      if (h2s[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) sec = i + 1;
      else break;
    }
    return sec;
  }

  /* The scanned unit for an element, or a memoized reference unit when the
     element is not a scanned readable unit. Reference units are not added
     to state.units: they are identified by the sidecar, not by the page
     scan, so the hash check and the unit enumeration never see them. The
     marker, the scroll and the bar name all work from the unit's element. */
  function unitForElement(el, kind, section, ordinal) {
    if (!el) return null;
    for (var i = 0; i < state.units.length; i++) if (state.units[i].el === el) return state.units[i];
    var key = (kind || '') + '|' + el.tagName + '|' + (el.className || '') + '|' + section + '|' + ordinal;
    if (state.refUnits[key]) return state.refUnits[key];
    var unit = { id: 'ref-' + (kind || 'unit') + '-' + section + '-' + ordinal, kind: kind || '', section: section, ordinal: ordinal, el: el, domId: el.id || null };
    state.refUnits[key] = unit;
    return unit;
  }

  /* Resolve a segment's elementRef. The transcript carries elementRef on
     units the page gives no id to, with the field names the transcript
     updater writes: an equation unit carries {card, line}, a figure or
     other unit carries {class, section, ordinal}. This is the fallback
     for units that carry no domId; the domId lookup in resolveSegment
     still runs first. */
  function resolveElementRef(seg) {
    var ref = seg.elementRef;
    if (!ref) return null;
    if (ref.card && typeof ref.line !== 'undefined') {
      var card = document.getElementById(ref.card);
      if (!card) return null;
      var lines = card.querySelectorAll('.eq-line');
      var lineEl = lines[Number(ref.line) - 1];
      if (!lineEl) return null;
      return unitForElement(lineEl, 'equation', seg.sectionIndex, ref.line);
    }
    if (ref.class && typeof ref.section !== 'undefined' && typeof ref.ordinal !== 'undefined') {
      var els = document.getElementsByClassName(ref.class);
      var inSection = [];
      for (var i = 0; i < els.length; i++) if (pageSectionOf(els[i]) === ref.section) inSection.push(els[i]);
      var pool = inSection.length ? inSection : els;
      var el = pool[Number(ref.ordinal) - 1];
      if (!el) return null;
      return unitForElement(el, seg.kind || '', ref.section, ref.ordinal);
    }
    return null;
  }

  /* Find the math line unit an equation segment names. The segment names
     the line by the card id plus the line number, by a synthesized
     card-l-N id, or, if the line itself ever carries an id, by that id.
     Returns null when the segment does not name a line, so the caller
     falls back to the card unit. */
  function resolveEqLine(seg) {
    var lines = state.units.filter(function (u) { return u.kind === 'equation' && typeof u.eqLine !== 'undefined'; });
    if (!lines.length) return null;
    var i, u;
    /* The domId matches below are skipped when domId_missing is set: a
       unit with the gate set must never resolve by domId even if a domId
       value is present. The section, cardOrdinal and eqLine match after
       this block uses no domId, so it still runs. */
    if (seg.domId && !seg.domId_missing) {
      for (i = 0; i < lines.length; i++) if (lines[i].domId === seg.domId) return lines[i];
      if (typeof seg.eqLine !== 'undefined') {
        for (i = 0; i < lines.length; i++) if (lines[i].cardDomId === seg.domId && String(lines[i].eqLine) === String(seg.eqLine)) return lines[i];
      }
      var m = /^(.+)-l(\d+)$/.exec(seg.domId);
      if (m) {
        for (i = 0; i < lines.length; i++) if (lines[i].cardDomId === m[1] && String(lines[i].eqLine) === m[2]) return lines[i];
      }
      for (i = 0; i < lines.length; i++) if (lines[i].cardDomId === seg.domId) return lines[i];
    }
    if (typeof seg.eqLine !== 'undefined' && typeof seg.cardOrdinal === 'number') {
      for (i = 0; i < lines.length; i++) {
        u = lines[i];
        if (u.section === seg.sectionIndex && u.cardOrdinal === seg.cardOrdinal && String(u.eqLine) === String(seg.eqLine)) return u;
      }
    }
    return null;
  }

  /* A segment can name a prose paragraph by an id this player never built:
     the sidecar counts a paragraph this player skips (inside a figure, a
     tool or a table), so the ids after it are shifted and the named id
     matches no unit here. The paragraph's hash still names it, so resolve
     by hash. This keeps the marker and the step buttons on the right
     paragraph, including the last one. */
  /* The sidecar's paragraph manifest entry for an id, or null. */
  function manifestEntry(paragraphId) {
    if (!state.sidecar) return null;
    var manifest = state.sidecar.paragraphs || state.sidecar.paragraphManifest || [];
    for (var i = 0; i < manifest.length; i++) {
      if (manifest[i].id === paragraphId) return manifest[i];
    }
    return null;
  }

  function resolveByParagraphHash(seg) {
    if (!seg.paragraphId || !state.sidecar || !state.hashes) return null;
    var entry = manifestEntry(seg.paragraphId);
    if (!entry || !entry.hash) return null;
    return searchByHash(seg.sectionIndex, entry.hash, entry.ordinal);
  }

  /* Resolution order, per the identification standard: a domId first,
     where the unit carries one and domId_missing is not set; then the
     elementRef fallback; then the ordinal fallback. A unit with
     domId_missing set must never resolve by domId even if a domId value
     is present; it goes straight to the elementRef fallback. The
     paragraph_id values on transcript units are transcript-side labels,
     not page ids, and the player never queries the DOM for them. */
  function resolveSegmentBase(seg) {
    if (!seg) return null;
    if (seg.paragraphId) {
      /* The hash names the paragraph text itself, so it is tried first
         when it is ready: the id is a positional label that shifts when
         the sidecar counts a paragraph this player never builds, and an
         id match after such a shift names the wrong paragraph. Before
         the hashes are ready the hash lookup returns null and the id
         lookup below is the best effort, as before. */
      var byHash = resolveByParagraphHash(seg);
      if (byHash) return byHash;
      var byId = state.unitsById[seg.paragraphId];
      if (byId) {
        /* The hashes are ready, no unit's text matched, and the id
           match's text disagrees with the manifest entry for this
           paragraph: the ids are shifted and the id match is the wrong
           paragraph. Point at nothing rather than at the wrong
           paragraph. */
        if (state.hashes) {
          var entry = manifestEntry(seg.paragraphId);
          if (entry && entry.hash && state.hashes[byId.id] !== entry.hash) return null;
        }
        return byId;
      }
    }
    var kind = seg.kind;
    var cands = state.units.filter(function (u) { return u.section === seg.sectionIndex; });
    function byKind(k) { return cands.filter(function (u) { return u.kind === k; }); }
    if (kind === 'prose') return null;
    if (kind === 'section_title') {
      var titles = byKind('section_title');
      return titles[0] || null;
    }
    if (kind === 'subhead') {
      var subs = byKind('subhead');
      if (seg.domId && !seg.domId_missing) {
        /* A domId names one element on the page, so it is looked up across
           all sections first; the section filter only applies to the
           ordinal fallback below it. A segment that names a figure in one
           narrative section while the figure sits in another page section
           must still resolve. */
        var allSubs = state.units.filter(function (u) { return u.kind === 'subhead'; });
        for (var i0 = 0; i0 < allSubs.length; i0++) if (allSubs[i0].domId === seg.domId) return allSubs[i0];
      }
      if (typeof seg.ordinal === 'number') return subs[seg.ordinal - 1] || null;
      return subs[0] || null;
    }
    if (kind === 'figure' || kind === 'equation' || kind === 'tool') {
      var list = byKind(kind);
      if (kind === 'equation') {
        /* An equation segment names a math line, not the card as a whole.
           The line itself carries no id on the page, so the segment names
           it by the card id plus the line number (domId plus eqLine, the
           same pair the eq-why segments already use), or by a synthesized
           card-l-N id. Resolve to the line unit so the marker sits next
           to the math line itself. */
        var lineUnit = resolveEqLine(seg);
        if (lineUnit) return lineUnit;
        list = list.filter(function (u) { return typeof u.eqLine === 'undefined'; });
      }
      if (seg.domId && !seg.domId_missing) {
        /* A domId names one element on the page, so it is looked up across
           all sections first; the section filter only applies to the
           ordinal fallback below it. */
        var allList = state.units.filter(function (u) { return u.kind === kind; });
        for (var j0 = 0; j0 < allList.length; j0++) if (allList[j0].domId === seg.domId) return allList[j0];
      }
      /* A segment that carries no usable domId may carry an elementRef
         instead: a card plus a line ordinal for an equation line, or a
         class plus a section plus an ordinal for an element the page gives
         no id to. The domId lookup above still runs first, unless
         domId_missing is set, in which case the segment goes straight
         here. */
      var refUnit = resolveElementRef(seg);
      if (refUnit) return refUnit;
      if (typeof seg.ordinal === 'number') return list[seg.ordinal - 1] || null;
      return list[0] || null;
    }
    if (kind === 'intuition' || kind === 'example') {
      var whys = byKind('eqwhy');
      if ((seg.domId && !seg.domId_missing) || typeof seg.eqLine !== 'undefined') {
        for (var k = 0; k < whys.length; k++) {
          var w = whys[k];
          if (seg.domId && !seg.domId_missing && w.domId !== seg.domId && !(w.cardOrdinal && seg.cardOrdinal === w.cardOrdinal)) continue;
          if (typeof seg.eqLine !== 'undefined' && String(seg.eqLine) !== String(w.eqLine)) continue;
          if (kind === 'intuition' && !w.labeled) continue;
          return w;
        }
      }
      /* An equation segment names its math line by elementRef (card plus
         line). The eq-why match above only runs when the segment carries
         a domId or eqLine, so a segment that names its line only by
         elementRef falls through to the first eq-why in the section, the
         wrong equation, and the marker lands on a hidden explanation
         instead of the line. Resolve it to the line itself, so the marker
         sits on the math and Previous steps from the right unit. */
      var refUnit = resolveElementRef(seg);
      if (refUnit) return refUnit;
      if (typeof seg.ordinal === 'number') return whys[seg.ordinal - 1] || null;
      return whys[0] || null;
    }
    if (kind === 'code' || kind === 'table' || kind === 'step_list') {
      var l2 = byKind(kind);
      if (typeof seg.ordinal === 'number') return l2[seg.ordinal - 1] || null;
      return l2[0] || null;
    }
    return null;
  }

  /* The list items of a list element: its direct LI children, or any
     descendant LI when the list is wrapped. */
  function listItems(el) {
    if (!el) return [];
    var kids = el.children || [];
    var out = [];
    for (var i = 0; i < kids.length; i++) if (kids[i].tagName === 'LI') out.push(kids[i]);
    if (out.length) return out;
    return Array.prototype.slice.call(el.querySelectorAll('li'));
  }

  /* Which item of a list a segment reads: the segments that name the
     same list read its items in order, so the segment's position among
     them is the item index. The first segment reads the first item, the
     second the second, and so on. Clamped to the last item. Cached per
     segment index; the sidecar does not change while the page runs. */
  function listItemUnit(seg, unit) {
    var segs = state.sidecar.segments || [];
    var segIdx = segs.indexOf(seg);
    if (segIdx < 0) return unit;
    if (!state.liCache) state.liCache = {};
    if (state.liCache[segIdx]) return state.liCache[segIdx];
    var items = listItems(unit.el);
    if (!items.length) { state.liCache[segIdx] = unit; return unit; }
    var idx = 0;
    for (var i = 0; i < segIdx; i++) {
      var u = resolveSegmentBase(segs[i]);
      if (u && u.id === unit.id) idx++;
    }
    var li = items[Math.min(idx, items.length - 1)];
    var liUnit = unitForElement(li, 'step_list', unit.section, unit.ordinal * 1000 + idx);
    state.liCache[segIdx] = liUnit;
    return liUnit;
  }

  /* Resolution with the list fix: a segment that names a list points
     the marker at the list item it reads, not at the list as a whole,
     so the marker moves to the next bullet point as the narration
     advances. Every other segment resolves exactly as before. */
  function resolveSegment(seg) {
    var unit = resolveSegmentBase(seg);
    if (!unit || unit.kind !== 'step_list') return unit;
    return listItemUnit(seg, unit);
  }

  function segmentAt(t) {
    var segs = state.sidecar.segments;
    var found = null;
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i];
      if (t >= s.startSeconds) found = s;
      else break;
    }
    return found;
  }

  function clearMarker() {
    if (state.markerEl && state.markerEl.parentNode) state.markerEl.parentNode.removeChild(state.markerEl);
    state.markerEl = null;
    if (state.markedEl) {
      state.markedEl.removeAttribute('aria-current');
      state.markedEl = null;
    }
    if (state.resizeObs) { state.resizeObs.disconnect(); state.resizeObs = null; }
  }

  function positionMarker() {
    if (!state.markerEl || !state.markedEl) return;
    var r = state.markedEl.getBoundingClientRect();
    var left, top;
    if (r.left < 18) {
      left = r.left + window.scrollX;
      top = r.top + window.scrollY - 26;
    } else {
      left = r.left + window.scrollX - 18;
      top = r.top + window.scrollY;
    }
    /* Keep the marker inside the viewport, not just inside the
       document: an element at the very top of the screen puts its
       marker above the screen otherwise. The clamp only applies
       while the element itself is on screen: an element scrolled
       far off screen keeps its marker at its own position, and
       the scroll brings both into view. */
    /* The marker never hides under the fixed nav either: an element
       at the top of the readable area keeps its marker below the
       nav, on the element itself, instead of 26 px above it. */
    if (r.top >= 0) top = Math.max(window.scrollY + navTop(), top);
    if (r.left >= 0) left = Math.max(window.scrollX, left);
    state.markerEl.style.left = left + 'px';
    state.markerEl.style.top = top + 'px';
  }

  function placeMarker(unit) {
    if (!unit || !unit.el) { clearMarker(); return; }
    if (state.markedEl === unit.el && state.markerEl) { positionMarker(); return; }
    clearMarker();
    var m = document.createElement('div');
    m.className = 'wt-marker wt-ui';
    m.setAttribute('aria-hidden', 'true');
    m.appendChild(svgTriangle());
    document.body.appendChild(m);
    state.markerEl = m;
    state.markedEl = unit.el;
    unit.el.setAttribute('aria-current', 'true');
    positionMarker();
    if ('ResizeObserver' in window) {
      state.resizeObs = new ResizeObserver(function () { positionMarker(); });
      state.resizeObs.observe(unit.el);
    }
  }

  function setSectionOutline(sectionIndex) {
    if (state.currentSection === sectionIndex) return;
    if (state.outlinedEl) state.outlinedEl.classList.remove('wt-section-current');
    state.outlinedEl = null;
    state.currentSection = sectionIndex;
    var target = null;
    if (sectionIndex === 0) target = document.querySelector('h1');
    else {
      var h2s = document.querySelectorAll('h2');
      target = h2s[sectionIndex - 1] || null;
    }
    if (target) {
      target.classList.add('wt-section-current');
      state.outlinedEl = target;
    }
  }

  function barHeight() { return state.bar ? state.bar.offsetHeight : 0; }

  /* The top of the readable area: below the fixed site nav, with a
     small gap. Measured from the nav itself, so it holds on every
     page at every width; 73 is the fallback when no nav is found
     (65 px nav plus 8 px gap). Every scroll in the player lands the
     marked element here, never at viewport top 0, where the nav
     would cover it. */
  function navTop() {
    var nav = document.querySelector('.topnav');
    if (nav) {
      var h = nav.offsetHeight;
      if (h > 0) return h + 8;
    }
    return 73;
  }

  /* Scroll an element so its top sits at navTop, used when the
     element must be the thing on screen, for example an equation
     line whose explanation block sits below it. */
  function scrollToNavTop(el) {
    var r = el.getBoundingClientRect();
    var delta = r.top - navTop();
    if (Math.abs(delta) < 2) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    state.progScroll = true;
    state.scrollGen = (state.scrollGen || 0) + 1;
    var gen = state.scrollGen;
    window.scrollBy({ top: delta, behavior: reduced ? 'auto' : 'smooth' });
    scheduleProgScrollClear(gen);
  }

  /* The eq-why div that explains one equation line: same card, same
     data-eqline. Null when the line has no explanation block. */
  function eqWhyForLine(unit) {
    if (!unit || !unit.el || !unit.el.getAttribute) return null;
    var lineNo = unit.el.getAttribute('data-eqline');
    if (lineNo === null || lineNo === '') return null;
    var card = unit.el;
    while (card && !(card.classList && card.classList.contains('eq-card'))) card = card.parentNode;
    if (!card) return null;
    var whys = card.querySelectorAll('.eq-why[data-eqline]');
    for (var i = 0; i < whys.length; i++) {
      if (whys[i].getAttribute('data-eqline') === lineNo) return whys[i];
    }
    return null;
  }

  function sheetHeight() {
    if (state.chaptersSheet && state.chaptersSheet.parentNode) return state.chaptersSheet.offsetHeight;
    if (state.transcriptPanel && state.transcriptPanel.parentNode && window.innerWidth <= 640) return state.transcriptPanel.offsetHeight;
    return 0;
  }

  function visibleBottom() {
    return window.innerHeight - barHeight() - sheetHeight();
  }

  /* Scroll an element into view, keeping its top, where the marker
     sits, on screen. An element taller than the visible area never
     scrolls to its bottom, or the top and the marker go off screen
     above it; it stays where its top is visible. A short element
     scrolls just enough to show its bottom too. */
  function scrollToElement(el) {
    var r = el.getBoundingClientRect();
    var bottom = visibleBottom();
    var top = navTop();
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var delta;
    if (r.top < top) delta = r.top - top;
    else if (r.top > bottom) delta = r.top - top;
    else if (r.height <= bottom && r.bottom > bottom) {
      delta = r.bottom - bottom + 8;
      /* Never scroll the element's own top above the nav: an
         element taller than the visible area keeps its top below
         the nav and its bottom below the fold, rather than hiding
         its top under the nav to show its bottom. */
      if (r.top - delta < top) delta = r.top - top;
      if (delta <= 0) return;
    }
    else return;
    state.progScroll = true;
    state.scrollGen = (state.scrollGen || 0) + 1;
    var gen = state.scrollGen;
    window.scrollBy({ top: delta, behavior: reduced ? 'auto' : 'smooth' });
    scheduleProgScrollClear(gen);
  }

  /* Clear the programmatic-scroll flag when the scroll ends. The
     generation keeps an old scroll's end from clearing the flag during
     a newer scroll: a new scroll cancels the old one, the old one's
     scrollend fires at once, and without the guard it would clear the
     flag while the new scroll is still running, so the scroll listener
     would read the new scroll as the reader scrolling away and stop
     following. A safety timer covers a scrollend that never fires. */
  function scheduleProgScrollClear(gen) {
    clearTimeout(state.scrollTimer);
    function clearIfCurrent() {
      if (state.scrollGen === gen) state.progScroll = false;
    }
    if ('onscrollend' in window) {
      var onEnd = function () {
        window.removeEventListener('scrollend', onEnd);
        clearIfCurrent();
      };
      window.addEventListener('scrollend', onEnd);
    }
    state.scrollTimer = setTimeout(clearIfCurrent, 2000);
  }

  /* A stepped equation card hides every line except the active one
     (the page CSS hides a line without eq-active, and the tool steps
     the card by moving eq-active between lines). When the narration
     names a line of such a card, activate that line first, setting
     eq-active on it and clearing it from the others, so the audio,
     the marker and the visible line always agree and the player never
     narrates a hidden line. A plain card shows all its lines, so the
     player leaves it alone: the card is only stepped when a line
     without eq-active is display none, read from the page's own CSS.
     The named line's eq-why div carries the same data-eqline, so it
     is activated with the line. */
  function activateEqLine(unit) {
    if (!unit || !unit.el || !unit.el.getAttribute) return;
    var lineNo = unit.el.getAttribute('data-eqline');
    if (lineNo === null || lineNo === '') return;
    var card = unit.el;
    while (card && !(card.classList && card.classList.contains('eq-card'))) card = card.parentNode;
    if (!card) return;
    var lines = card.querySelectorAll('.eq-line');
    var stepped = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].classList.contains('eq-active')) continue;
      var cs = null;
      try { cs = window.getComputedStyle(lines[i]); } catch (e) { cs = null; }
      if (cs && cs.display === 'none') { stepped = true; break; }
    }
    if (!stepped) return;
    var items = card.querySelectorAll('[data-eqline]');
    for (var j = 0; j < items.length; j++) {
      if (items[j].getAttribute('data-eqline') === lineNo) items[j].classList.add('eq-active');
      else items[j].classList.remove('eq-active');
    }
    card.classList.remove('rw-empty');
  }

  function updateForTime(t, fromSeek) {
    var seg = segmentAt(t);
    if (!seg) return;
    var changed = !state.currentSeg || state.currentSeg !== seg;
    state.currentSeg = seg;
    if (changed) updateStepButtons();
    setSectionOutline(seg.sectionIndex);
    var unit = resolveSegment(seg);
    if (unit) {
      var samePara = state.markedEl === unit.el;
      activateEqLine(unit);
      placeMarker(unit);
      if (state.following && changed && !samePara) scrollToElement(unit.el);
      /* An equation line being expanded term by term stays on screen
         even when following is off: the reader cannot follow an
         expansion of an equation they cannot see. A new line segment
         always brings its line into view; while its terms continue,
         the line is only pulled back when it has gone fully off
         screen, so a reader who scrolled it partly away is not
         fought on every frame. */
      if (unit.kind === 'equation' && typeof unit.eqLine !== 'undefined') {
        if (changed) {
          /* A line with an explanation block of its own is scrolled
             to the top of the readable area, so the block below it
             is on screen during the term walk. Leaving the line
             where it already sits, at the bottom of the screen,
             would show the previous line's block above it instead. */
          var why = eqWhyForLine(unit);
          if (why) {
            var wr = why.getBoundingClientRect();
            var lr0 = unit.el.getBoundingClientRect();
            if (wr.bottom > visibleBottom() || lr0.top > navTop() + 8) scrollToNavTop(unit.el);
            else scrollToElement(unit.el);
          } else scrollToElement(unit.el);
        }
        else {
          var lr = unit.el.getBoundingClientRect();
          if (lr.bottom < 0 || lr.top > visibleBottom()) scrollToElement(unit.el);
        }
      }
      if (state.barElem) state.barElem.textContent = elementNameFor(seg, unit);
    } else {
      clearMarker();
      if (state.barElem) state.barElem.textContent = '';
    }
    if (state.barPos) state.barPos.textContent = posText(t);
    updateChapterDisplay(t);
    if (state.transcriptPanel && state.transcriptPanel.parentNode) renderTranscriptSection(seg.sectionIndex, seg);
    checkTryIt(t);
    state.lastTime = t;
  }

  /* ---------- try-it pauses ---------- */

  function checkTryIt(t) {
    var points = (state.sidecar && state.sidecar.tryIt) || [];
    if (!state.audio || state.audio.paused) return;
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      if (state.tryItFiredAt === i) continue;
      if (state.lastTime < p.startSeconds && t >= p.startSeconds) {
        state.tryItFiredAt = i;
        state.tryIt = p;
        state.audio.pause();
        savePosition();
        showRow3('both');
        announceTryIt(p);
        return;
      }
    }
  }

  function announceTryIt(p) {
    if (!state.bar) return;
    var el = p.element || {};
    var name = (el.kind || 'element') + (el.id ? ' ' + el.id : '');
    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
    live.textContent = 'Audio paused for a try-it on ' + name + '.';
    /* The announcement is for screen readers, not bar content: it
       lives on the body, so the bar's own text stays just its
       controls (a minimized bar reads as only the triangle). */
    (document.body || document.documentElement).appendChild(live);
    setTimeout(function () { if (live.parentNode) live.parentNode.removeChild(live); }, 5000);
  }

  /* ---------- step buttons: previous and next thing to read ---------- */

  /* The step stops, in narration order: one stop per thing to read.
     Most units are one stop, at their first segment. An eq-why unit is
     one stop per segment, so Intuition, Mathematics and Example are
     each a stop with the marker staying on the div, and Back from the
     Example goes to the Mathematics, Back from the Mathematics to the
     Intuition, Back from the Intuition to the equation line. A list
     unit is one stop per segment too, one per bullet, so Back steps
     through the bullets. Narration order, not document order: the
     equation lines are enumerated as a group before the eq-why divs,
     so document order would put both lines before both divs and Back
     from an eq-why block would land on the wrong line. Computed once;
     the page does not change while the walkthrough runs. */
  function stepStops() {
    if (state.stepStops) return state.stepStops;
    var segs = state.sidecar.segments || [];
    var seen = {};
    var stops = [];
    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];
      var base = resolveSegmentBase(seg);
      if (!base) continue;
      if (base.kind === 'eqwhy' || base.kind === 'step_list') {
        stops.push({ seg: seg, unit: resolveSegment(seg) });
      } else if (!seen[base.id]) {
        seen[base.id] = true;
        stops.push({ seg: seg, unit: base });
      }
    }
    state.stepStops = stops;
    return stops;
  }

  function currentStepIndex() {
    /* The audio's currentTime is the source of truth: it reflects a seek
       target at once, while state.currentSeg only catches up on the next
       seeked/timeupdate event. Reading the step from currentTime keeps
       rapid taps advancing instead of re-seeking to the same segment,
       which made Next look stuck. */
    var seg = null;
    if (state.audio) seg = segmentAt(state.audio.currentTime);
    if (!seg) seg = state.currentSeg;
    if (!seg) return -1;
    var stops = stepStops();
    for (var i = 0; i < stops.length; i++) if (stops[i].seg === seg) return i;
    var unit = resolveSegmentBase(seg);
    if (!unit) return -1;
    for (var j = 0; j < stops.length; j++) if (stops[j].unit === unit) return j;
    return -1;
  }

  function updateStepButtons() {
    if (!state.barBack || !state.barNext) return;
    var idx = currentStepIndex();
    var list = stepStops();
    state.barBack.disabled = idx <= 0;
    state.barNext.disabled = idx < 0 || idx >= list.length - 1;
  }

  function stepTo(dir) {
    if (!state.audio) return;
    var list = stepStops();
    if (!list.length) return;
    var cur = currentStepIndex();
    var next = dir > 0 ? (cur < 0 ? 0 : cur + 1) : (cur < 0 ? list.length - 1 : cur - 1);
    if (next < 0 || next >= list.length) return;
    var seg = list[next].seg;
    if (!seg) return;
    state.following = true;
    showRow3('none');
    state.audio.currentTime = seg.startSeconds;
    state.audio.play();
    updateStepButtons();
  }

  /* Whole-walkthrough time, always labeled and always with its
     total, at every width. At phone width it lives in the bar
     middle on its own line and the separate readout is hidden, so
     the two times can never collide. */
  function posText(t) {
    return 'Total ' + fmt(t) + ' / ' + fmt(state.sidecar.totalSeconds);
  }

  /* Which chapter the audio is in: the last chapter whose start is
     at or before t. -1 when there are no chapters. */
  function chapterIndexForTime(t) {
    var chapters = (state.sidecar && state.sidecar.chapters) || [];
    var idx = -1;
    for (var i = 0; i < chapters.length; i++) {
      if ((chapters[i].startSeconds || 0) <= t) idx = i;
      else break;
    }
    return idx;
  }

  /* Mark the playing chapter in the open chapters sheet, if any:
     bold, a blue edge, and the words Now playing. Called on every
     time update, but it only touches the DOM when the chapter
     changes. */
  function markCurrentChapter(t) {
    if (!state.chaptersSheet || !state.chapterItems) return;
    var idx = chapterIndexForTime(t);
    if (idx === state.currentChapterIdx) return;
    state.currentChapterIdx = idx;
    for (var i = 0; i < state.chapterItems.length; i++) {
      var item = state.chapterItems[i];
      var cur = i === idx;
      if (item.li) {
        if (cur) item.li.classList.add('wt-chapter-current');
        else item.li.classList.remove('wt-chapter-current');
      }
      if (item.btn) {
        if (cur) item.btn.setAttribute('aria-current', 'true');
        else item.btn.removeAttribute('aria-current');
      }
      if (item.now) item.now.textContent = cur ? ' · Now playing' : '';
    }
  }

  /* Chapter time for the bar middle: current over chapter total, plus
     the thin track showing position within the current chapter. The
     chapter is the last one whose start is at or before t; its end is
     the next chapter start, or the walkthrough end. */
  function chapterBounds(t) {
    var chapters = (state.sidecar && state.sidecar.chapters) || [];
    var total = state.sidecar ? state.sidecar.totalSeconds : 0;
    var start = 0, end = total;
    for (var i = 0; i < chapters.length; i++) {
      var cs = chapters[i].startSeconds || 0;
      if (cs <= t) start = cs;
      else { end = cs; break; }
    }
    return { start: start, end: end };
  }

  function updateChapterDisplay(t) {
    if (!state.barMidTime || !state.barMidFill || !state.sidecar) return;
    var b = chapterBounds(t);
    state.chapterStart = b.start;
    state.chapterEnd = b.end;
    var span = Math.max(1, b.end - b.start);
    var elapsed = Math.max(0, Math.min(span, t - b.start));
    state.barMidTime.textContent = 'Chapter ' + fmt(elapsed) + ' / ' + fmt(span);
    if (state.barMidTotal) state.barMidTotal.textContent = posText(t);
    state.barMidFill.style.width = (elapsed / span * 100).toFixed(1) + '%';
    markCurrentChapter(t);
  }

  /* ---------- bottom bar ---------- */

  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'wt-bar wt-ui';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Walkthrough player');
    var main = document.createElement('div');
    main.className = 'wt-bar-main';
    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'wt-bar-step';
    backBtn.setAttribute('aria-label', 'Previous');
    var backFull = document.createElement('span');
    backFull.className = 'wt-full';
    backFull.textContent = 'Back';
    var backShort = document.createElement('span');
    backShort.className = 'wt-short';
    backShort.textContent = '‹';
    backBtn.appendChild(backFull);
    backBtn.appendChild(backShort);
    backBtn.addEventListener('click', function () { stepTo(-1); });
    var play = document.createElement('button');
    play.type = 'button';
    play.className = 'wt-bar-play';
    play.textContent = 'Play';
    play.addEventListener('click', function () { togglePlay(); });
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'wt-bar-step';
    nextBtn.setAttribute('aria-label', 'Next');
    var nextFull = document.createElement('span');
    nextFull.className = 'wt-full';
    nextFull.textContent = 'Next';
    var nextShort = document.createElement('span');
    nextShort.className = 'wt-short';
    nextShort.textContent = '›';
    nextBtn.appendChild(nextFull);
    nextBtn.appendChild(nextShort);
    nextBtn.addEventListener('click', function (e) { if (e && e.stopPropagation) e.stopPropagation(); stepTo(1); });
    /* The middle of the bar carries the chapter time, labeled,
       current over chapter total, plus a track showing position
       within the current chapter. The whole-walkthrough time is
       labeled too: on its own line in the middle at phone width,
       where the bar wraps, and as the separate readout at wider
       widths. No chapter title text lives anywhere in the bar;
       titles live in the chapters list. */
    var mid = document.createElement('div');
    mid.className = 'wt-bar-mid';
    var chapTime = document.createElement('span');
    chapTime.className = 'wt-bar-chaptime';
    chapTime.textContent = 'Chapter 0:00 / 0:00';
    var totalTime = document.createElement('span');
    totalTime.className = 'wt-bar-chaptime wt-short';
    totalTime.textContent = posText(0);
    var track = document.createElement('div');
    track.className = 'wt-bar-track';
    track.setAttribute('aria-hidden', 'true');
    var fill = document.createElement('div');
    fill.className = 'wt-bar-trackfill';
    track.appendChild(fill);
    mid.appendChild(chapTime);
    mid.appendChild(totalTime);
    mid.appendChild(track);
    var elem = document.createElement('span');
    elem.className = 'wt-bar-elem';
    var pos = document.createElement('span');
    pos.className = 'wt-bar-pos wt-full';
    pos.textContent = posText(0);
    var speedSel = document.createElement('select');
    speedSel.className = 'wt-bar-speed';
    speedSel.setAttribute('aria-label', 'Speed');
    SPEEDS.forEach(function (sp) {
      var opt = document.createElement('option');
      opt.value = sp.toFixed(1);
      opt.textContent = sp.toFixed(1) + 'x';
      speedSel.appendChild(opt);
    });
    speedSel.value = state.speed.toFixed(1);
    speedSel.addEventListener('change', function () {
      var sp = parseFloat(speedSel.value);
      if (SPEEDS.indexOf(sp) < 0) { speedSel.value = state.speed.toFixed(1); return; }
      state.speed = sp;
      save(SPEED_KEY, { r: sp });
      if (state.audio) state.audio.playbackRate = sp;
    });
    var chaptersBtn = document.createElement('button');
    chaptersBtn.type = 'button';
    var chFull = document.createElement('span');
    chFull.className = 'wt-full';
    chFull.textContent = 'Chapters';
    var chShort = document.createElement('span');
    chShort.className = 'wt-short';
    chShort.textContent = 'Ch.';
    chaptersBtn.appendChild(chFull);
    chaptersBtn.appendChild(chShort);
    chaptersBtn.addEventListener('click', function () { toggleChapters(chaptersBtn); });
    /* Music-only mute: silences the background music, never the
       narration. It sits in the bar so it is reachable while
       listening, and hides with everything else when minimized. */
    var musicBtn = document.createElement('button');
    musicBtn.type = 'button';
    var muFull = document.createElement('span');
    muFull.className = 'wt-full';
    muFull.textContent = 'Music';
    var muShort = document.createElement('span');
    muShort.className = 'wt-short';
    muShort.textContent = '♪';
    musicBtn.appendChild(muFull);
    musicBtn.appendChild(muShort);
    musicBtn.addEventListener('click', function () { toggleMusicMute(); });
    var minBtn = document.createElement('button');
    minBtn.type = 'button';
    minBtn.className = 'wt-bar-minbtn';
    minBtn.setAttribute('aria-label', 'Minimize player');
    minBtn.textContent = '▾';
    minBtn.addEventListener('click', function (e) { if (e && e.stopPropagation) e.stopPropagation(); toggleMinimize(); });
    var row3 = document.createElement('div');
    row3.className = 'wt-bar-row3';
    row3.style.display = 'none';
    main.appendChild(backBtn);
    main.appendChild(play);
    main.appendChild(nextBtn);
    main.appendChild(mid);
    main.appendChild(elem);
    main.appendChild(pos);
    main.appendChild(speedSel);
    main.appendChild(chaptersBtn);
    main.appendChild(musicBtn);
    main.appendChild(minBtn);
    /* The save line in the bar itself, so the listener sees it while
       listening, not only in the row above. Hidden until the save
       starts, and hidden again when the bar is minimized. */
    var barSave = document.createElement('div');
    barSave.className = 'wt-bar-save';
    bar.appendChild(main);
    bar.appendChild(barSave);
    bar.appendChild(row3);
    var row = document.querySelector('.pc-row');
    if (row && row.parentNode) row.parentNode.insertBefore(bar, row.nextSibling);
    else document.body.insertBefore(bar, document.body.firstChild);
    state.bar = bar;
    state.barSave = barSave;
    state.barMid = mid;
    state.barMidTime = chapTime;
    state.barMidTotal = totalTime;
    state.barMidFill = fill;
    if (!state.saveListenersAdded) {
      state.saveListenersAdded = true;
      window.addEventListener('online', refreshSaveLine);
      window.addEventListener('offline', refreshSaveLine);
    }
    refreshSaveLine();
    state.barElem = elem;
    state.barPos = pos;
    state.barPlay = play;
    state.barBack = backBtn;
    state.barNext = nextBtn;
    state.barMinBtn = minBtn;
    state.barSpeed = speedSel;
    state.musicMuteBtn = musicBtn;
    updateMusicMuteBtn();
    state.row3 = row3;
    state.chaptersBtn = chaptersBtn;
    updateStepButtons();
    updateChapterDisplay(0);
    if (loadMinimized()) {
      state.minimized = true;
      bar.classList.add('wt-min');
      minBtn.textContent = '▴';
      minBtn.setAttribute('aria-label', 'Expand player');
    }
    return bar;
  }

  function toggleMinimize() {
    if (!state.bar) return;
    state.minimized = !state.minimized;
    save(MIN_KEY, { m: state.minimized });
    state.bar.classList.toggle('wt-min', state.minimized);
    if (state.barMinBtn) {
      state.barMinBtn.textContent = state.minimized ? '▴' : '▾';
      state.barMinBtn.setAttribute('aria-label', state.minimized ? 'Expand player' : 'Minimize player');
    }
    /* The bar height is measured live wherever it is used, so minimizing
       and expanding re-measure on their own. The sheet and panel pin their
       bottom to the bar height at open time, so re-pin them here, and
       re-scroll the marked element when following is on, so expanding the
       bar never covers it. The third row is left alone: hiding Resume
       during a try-it pause would strand the reader. */
    if (state.chaptersSheet && state.chaptersSheet.parentNode) state.chaptersSheet.style.bottom = barHeight() + 'px';
    if (state.transcriptPanel && state.transcriptPanel.parentNode) state.transcriptPanel.style.bottom = barHeight() + 'px';
    if (state.following && state.markedEl) scrollToElement(state.markedEl);
  }

  function showRow3(kind) {
    if (!state.row3) return;
    state.row3.textContent = '';
    /* 'jump' used to offer Back to the audio and Play from this paragraph.
       Both controls are removed, so a scrolled-away reader gets no row;
       they scroll back or tap Play themselves. */
    if (kind === 'none' || kind === 'jump') { state.row3.style.display = 'none'; return; }
    state.row3.style.display = 'flex';
    function mkBtn(text, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', fn);
      state.row3.appendChild(b);
      return b;
    }
    if (kind === 'tryit' || kind === 'both') {
      mkBtn('Resume', function () {
        state.tryIt = null;
        showRow3(state.following ? 'none' : 'jump');
        if (state.audio) state.audio.play();
      });
      mkBtn('Skip', function () {
        var p = state.tryIt;
        state.tryIt = null;
        state.following = true;
        showRow3('none');
        if (p && state.audio) {
          var segs = state.sidecar.segments;
          var next = null;
          for (var i = 0; i < segs.length; i++) {
            if (segs[i].startSeconds > p.startSeconds) { next = segs[i]; break; }
          }
          if (next) state.audio.currentTime = next.startSeconds;
        }
        if (state.audio) state.audio.play();
      });
    }
  }

  function pauseFollowing() {
    if (!state.following) return;
    state.following = false;
    showRow3(state.tryIt ? 'both' : 'jump');
  }

  /* Topmost readable unit with at least 24 pixels of its height, or its
     full height where shorter, inside the visible area. Section titles
     and subheads yield to the next readable unit below them, and units
     with no segment are skipped. */
  function topVisibleUnit() {
    var bottom = visibleBottom();
    var top = navTop();
    for (var i = 0; i < state.units.length; i++) {
      var u = state.units[i];
      if (u.kind === 'section_title' || u.kind === 'subhead') continue;
      var r = u.el.getBoundingClientRect();
      var visTop = Math.max(top, r.top);
      var visBottom = Math.min(bottom, r.bottom);
      var vis = visBottom - visTop;
      var need = Math.min(24, r.height);
      if (vis >= need && r.bottom > 0 && r.top < bottom) {
        if (!firstSegmentForUnit(u)) continue;
        return u;
      }
    }
    return null;
  }

  function firstSegmentForUnit(unit) {
    var segs = state.sidecar.segments;
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i];
      if (s.paragraphId === unit.id) return s;
      /* The base resolution names the list itself; the list-item
         mapping names one item, so it never matches the list unit. */
      var resolved = resolveSegmentBase(s);
      if (resolved === unit) return s;
    }
    return null;
  }

  /* ---------- chapters and transcript ---------- */

  function closeSheets(returnFocus) {
    if (state.chaptersSheet && state.chaptersSheet.parentNode) {
      state.chaptersSheet.parentNode.removeChild(state.chaptersSheet);
      state.chaptersSheet = null;
      if (returnFocus && state.chaptersBtn) state.chaptersBtn.focus();
    }
    if (state.transcriptPanel && state.transcriptPanel.parentNode) {
      state.transcriptPanel.parentNode.removeChild(state.transcriptPanel);
      state.transcriptPanel = null;
      if (returnFocus && state.transcriptBtn) state.transcriptBtn.focus();
    }
  }

  function toggleChapters(btn) {
    if (state.chaptersSheet) { closeSheets(true); return; }
    closeSheets(false);
    var sheet = document.createElement('div');
    sheet.className = 'wt-sheet wt-ui';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', 'Chapters');
    var h = document.createElement('h2');
    h.textContent = 'Chapters';
    sheet.appendChild(h);
    var ul = document.createElement('ul');
    var chapters = state.sidecar.chapters || [];
    state.chapterItems = [];
    state.currentChapterIdx = -1;
    chapters.forEach(function (ch, chIdx) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = ch.title || ('Section ' + (ch.sectionIndex + 1));
      var now = document.createElement('span');
      now.className = 'wt-now';
      b.appendChild(now);
      state.chapterItems.push({ li: li, btn: b, now: now, start: ch.startSeconds || 0 });
      b.addEventListener('click', function () {
        closeSheets(false);
        clearMarker();
        state.tryIt = null;
        state.following = true;
        showRow3('none');
        if (state.audio) {
          state.audio.currentTime = ch.startSeconds || 0;
          state.audio.play();
        }
      });
      li.appendChild(b);
      ul.appendChild(li);
      (ch.subChapters || ch.sub_chapters || []).forEach(function (sub) {
        var li2 = document.createElement('li');
        li2.className = 'wt-sub';
        var b2 = document.createElement('button');
        b2.type = 'button';
        b2.textContent = sub.mark || sub.text || '';
        b2.addEventListener('click', function () {
          closeSheets(false);
          clearMarker();
          state.tryIt = null;
          state.following = true;
          showRow3('none');
          if (state.audio) {
            state.audio.currentTime = sub.startSeconds || sub.start_seconds || 0;
            state.audio.play();
          }
        });
        li2.appendChild(b2);
        ul.appendChild(li2);
      });
    });
    sheet.appendChild(ul);
    sheet.style.bottom = barHeight() + 'px';
    document.body.appendChild(sheet);
    state.chaptersSheet = sheet;
    markCurrentChapter(state.audio ? state.audio.currentTime : 0);
    var firstBtn = sheet.querySelector('button');
    if (firstBtn) firstBtn.focus();
  }

  function toggleTranscript(btn) {
    if (state.transcriptPanel) { closeSheets(true); return; }
    closeSheets(false);
    var panel = document.createElement('div');
    panel.className = 'wt-panel wt-ui';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Transcript');
    document.body.appendChild(panel);
    state.transcriptPanel = panel;
    positionTranscriptPanel();
    if (!state.transcriptLoaded) {
      var url;
      try { url = new URL(state.entry.script, BASE).href; } catch (e) { url = ''; }
      fetch(url).then(function (res) {
        if (!res.ok) throw new Error('script fetch failed');
        return res.json();
      }).then(function (script) {
        state.transcriptData = script;
        state.transcriptLoaded = true;
        renderTranscriptSection(state.currentSection >= 0 ? state.currentSection : 0, state.currentSeg);
      }).catch(function () {
        panel.textContent = '';
        var m = document.createElement('p');
        m.textContent = 'Transcript could not load.';
        var again = document.createElement('button');
        again.type = 'button';
        again.textContent = 'Try again';
        again.addEventListener('click', function () {
          state.transcriptLoaded = false;
          toggleTranscript(btn);
          toggleTranscript(btn);
        });
        panel.appendChild(m);
        panel.appendChild(again);
      });
    } else {
      renderTranscriptSection(state.currentSection >= 0 ? state.currentSection : 0, state.currentSeg);
    }
  }

  function positionTranscriptPanel() {
    var panel = state.transcriptPanel;
    if (!panel) return;
    if (window.innerWidth <= 640) {
      panel.style.left = '0';
      panel.style.right = '0';
      panel.style.top = 'auto';
      panel.style.bottom = barHeight() + 'px';
      panel.style.width = '100vw';
      panel.style.maxHeight = '60vh';
      panel.style.borderLeft = '0';
      panel.style.borderTop = '1px solid #999';
    } else {
      var row = document.querySelector('.pc-row');
      var top = 0;
      if (row) {
        var r = row.getBoundingClientRect();
        if (r.bottom > 0) top = Math.max(0, r.bottom);
      }
      panel.style.left = 'auto';
      panel.style.right = '0';
      panel.style.top = top + 'px';
      panel.style.bottom = barHeight() + 'px';
      panel.style.width = '360px';
      panel.style.maxHeight = 'none';
      panel.style.borderLeft = '1px solid #999';
      panel.style.borderTop = '0';
    }
  }

  function renderTranscriptSection(sectionIndex, seg) {
    var panel = state.transcriptPanel;
    if (!panel || !state.transcriptData) return;
    var sections = state.transcriptData.sections || [];
    var currentIdx = -1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].sectionIndex === sectionIndex) { currentIdx = i; break; }
    }
    if (currentIdx < 0) {
      /* Script sections run in sidecar chapter order, so the chapter
         position for this section is the script section index. */
      var chapters = state.sidecar.chapters || [];
      for (var j = 0; j < chapters.length; j++) {
        if (chapters[j].sectionIndex === sectionIndex) { currentIdx = j; break; }
      }
    }
    if (currentIdx < 0 || currentIdx >= sections.length) return;
    var sec = sections[currentIdx];
    panel.textContent = '';
    var h = document.createElement('h2');
    h.textContent = sec.section || sec.title || '';
    panel.appendChild(h);
    var segIndex = -1;
    if (seg) {
      var segs = state.sidecar.segments;
      segIndex = segs.indexOf(seg);
    }
    (sec.units || []).forEach(function (u) {
      var p = document.createElement('p');
      p.className = 'wt-tr-line';
      var isExpl = u.kind && u.kind !== 'prose' && u.kind !== 'section_title';
      if (isExpl) {
        p.classList.add('wt-tr-expl');
        var tag = document.createElement('span');
        tag.className = 'wt-tr-tag';
        tag.textContent = 'Explanation ';
        p.appendChild(tag);
      }
      p.appendChild(document.createTextNode(u.spoken || u.text || ''));
      if (typeof u.segmentIndex === 'number' && u.segmentIndex === segIndex) p.classList.add('wt-tr-current');
      panel.appendChild(p);
    });
  }

  /* ---------- playback, resume, cross-pause ---------- */

  function savePosition() {
    if (!state.audio || !state.sidecar) return;
    var seg = state.currentSeg;
    save(slugKey(), {
      v: state.entry.version,
      t: state.audio.currentTime,
      section: seg ? seg.sectionIndex : 0,
      unit: seg ? seg.unitIndex : 0,
      savedAt: Date.now(),
    });
  }

  function savedStart() {
    var saved = load(slugKey());
    if (!saved || saved.v !== state.entry.version) return 0;
    var t = typeof saved.t === 'number' && isFinite(saved.t) ? saved.t : 0;
    var total = state.sidecar.totalSeconds;
    if (t > RESUME_MIN_SECS && t < total - RESUME_MIN_SECS) return t;
    return 0;
  }

  function buttonLabel() {
    var pos = savedStart();
    if (pos) return 'Resume walkthrough (' + fmt(pos) + ' of ' + mins(state.sidecar.totalSeconds) + ')';
    return 'Walk through with audio (' + mins(state.sidecar.totalSeconds) + ')';
  }

  /* A plain message in the bar, replacing any earlier one. With a
     retry it also adds a Try again button, as the old load error did. */
  function showBarMessage(text, withRetry) {
    if (!state.bar) return;
    var old = state.bar.querySelector('.wt-bar-msg');
    if (old) old.parentNode.removeChild(old);
    var m = document.createElement('div');
    m.className = 'wt-bar-msg';
    m.textContent = text;
    state.bar.appendChild(m);
    if (withRetry) {
      var again = document.createElement('button');
      again.type = 'button';
      again.textContent = 'Try again';
      again.addEventListener('click', function () {
        if (state.audio) {
          state.audio.load();
          state.audio.play();
        }
      });
      state.bar.appendChild(again);
    }
  }

  function createAudio() {
    var au = document.createElement('audio');
    au.preload = 'none';
    au.setAttribute('aria-label', 'Walkthrough audio');
    au.playbackRate = state.speed;
    au.defaultPlaybackRate = state.speed;
    var src;
    try { src = new URL(state.entry.audio, BASE).href; } catch (e) { return null; }
    au.src = src;
    var lastSave = 0;
    au.addEventListener('play', function () {
      state.playing = true;
      state.loading = false;
      if (state.barPlay) state.barPlay.textContent = 'Pause';
      tellWorkerPlaying();
      syncMusic();
      document.dispatchEvent(new CustomEvent('audio-started', { detail: { source: 'walkthrough' } }));
    });
    au.addEventListener('playing', function () {
      state.loading = false;
      if (state.barPlay) state.barPlay.textContent = 'Pause';
    });
    au.addEventListener('waiting', function () {
      state.loading = true;
      if (state.barPlay) state.barPlay.textContent = 'Loading';
    });
    au.addEventListener('pause', function () {
      state.playing = false;
      if (state.barPlay) state.barPlay.textContent = 'Play';
      savePosition();
      syncMusic();
    });
    au.addEventListener('seeked', function () {
      clearMarker();
      state.lastTime = au.currentTime;
      updateForTime(au.currentTime, true);
      savePosition();
    });
    au.addEventListener('timeupdate', function () {
      var now = Date.now();
      if (now - lastSave > 5000) { lastSave = now; savePosition(); }
      updateForTime(au.currentTime, false);
    });
    au.addEventListener('ended', function () {
      state.playing = false;
      if (state.musicAudio) { state.musicAudio.pause(); try { state.musicAudio.currentTime = 0; } catch (e) { /* ignore */ } }
      clear(slugKey());
      clearMarker();
      if (state.outlinedEl) state.outlinedEl.classList.remove('wt-section-current');
      state.outlinedEl = null;
      state.currentSection = -1;
      if (state.bar && state.bar.parentNode) state.bar.parentNode.removeChild(state.bar);
      state.bar = null;
      state.audio = null;
      askCachedOnInit();
      refreshTopButton();
    });
    au.addEventListener('error', function () {
      state.playing = false;
      syncMusic();
      if (!state.bar) return;
      if (state.barPlay) state.barPlay.textContent = 'Play';
      if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
        showBarMessage(OFFLINE_MSG, false);
        return;
      }
      showBarMessage('The walkthrough could not load.', true);
    });
    state.audio = au;
    return au;
  }

  function rafLoop() {
    if (!state.audio || state.audio.ended) { state.rafId = 0; return; }
    if (!state.audio.paused) {
      var t = state.audio.currentTime;
      updateForTime(t, false);
    }
    state.rafId = requestAnimationFrame(rafLoop);
  }

  function togglePlay() {
    if (!state.audio) return;
    if (state.audio.paused) {
      if (state.loading) return;
      state.audio.play();
    } else {
      state.audio.pause();
    }
  }

  function startWalkthrough(fromTop) {
    if (!state.bar) buildBar();
    if (state.audio) { togglePlay(); return; }
    if (state.firstPlayPending) return;
    /* Offline, the player asks the worker first whether this
       walkthrough is saved. Cached plays from the cache; not cached
       shows the plain not-saved message instead of starting playback,
       with no stuck loading box and no retries. */
    if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
      state.firstPlayPending = true;
      askWorkerCached(audioUrl(), 1000).then(function (cached) {
        state.firstPlayPending = false;
        if (cached === true) { beginFirstPlay(); return; }
        showOfflineNotSaved();
      });
      return;
    }
    state.firstPlayPending = true;
    waitForWorkerReady().then(function () {
      state.firstPlayPending = false;
      beginFirstPlay();
    });
  }

  function beginFirstPlay() {
    if (state.audio) { togglePlay(); return; }
    var au = createAudio();
    if (!au) return;
    var pos = savedStart();
    if (pos) {
      au.addEventListener('loadedmetadata', function onMeta() {
        au.removeEventListener('loadedmetadata', onMeta);
        try { au.currentTime = pos; } catch (e) { /* ignore */ }
      });
    }
    if (state.barPlay) state.barPlay.textContent = 'Loading';
    state.loading = true;
    /* First play starts the save: the worker caches the audio in
       the background, so the row and the bar read Saving... until
       the worker reports it cached. */
    if (!state.savedShown) showSavingIndicator();
    au.play();
    if (!state.rafId) state.rafId = requestAnimationFrame(rafLoop);
    state.following = true;
  }

  var topButton = null;

  function refreshTopButton() {
    if (!topButton || !state.sidecar) return;
    topButton.textContent = '';
    topButton.appendChild(svgPlay());
    topButton.appendChild(document.createTextNode(buttonLabel()));
  }

  function showLiveButton(wtSpan) {
    wtSpan.textContent = '';
    /* The span hugs its real content now; the worst-case sizing only
       reserved space while it was empty. Clearing in the same step as
       filling keeps the row from shifting after the button paints. */
    wtSpan.style.minHeight = '';
    wtSpan.style.minWidth = '';
    var b = button(buttonLabel(), true);
    b.addEventListener('click', function () {
      if (!state.audio) { startWalkthrough(); return; }
      if (state.audio.paused) {
        state.audio.play();
        if (state.following && state.markedEl) scrollToElement(state.markedEl);
      } else {
        state.audio.pause();
      }
    });
    topButton = b;
    wtSpan.appendChild(b);
    showMusicRow(wtSpan);
    if (state.savedShown) showSavedIndicator();
  }

  /* ---------- scroll and keyboard ---------- */

  function bindScroll() {
    window.addEventListener('scroll', function () {
      if (state.progScroll) return;
      if (state.audio && state.following) pauseFollowing();
    }, { passive: true });
    function userGrab() {
      state.progScroll = false;
      if (state.audio && state.following) pauseFollowing();
    }
    window.addEventListener('wheel', userGrab, { passive: true });
    window.addEventListener('touchstart', userGrab, { passive: true });
    window.addEventListener('touchmove', userGrab, { passive: true });
    window.addEventListener('resize', function () {
      positionMarker();
      positionTranscriptPanel();
      if (state.following && state.markedEl) scrollToElement(state.markedEl);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.chaptersSheet || state.transcriptPanel) {
          closeSheets(true);
          e.stopPropagation();
        }
      }
    });
    document.addEventListener('audio-started', function (e) {
      if (e.detail && e.detail.source === 'podcast' && state.audio && !state.audio.paused) {
        state.audio.pause();
      }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') savePosition();
    });
    window.addEventListener('pagehide', function () { savePosition(); });
  }

  /* ---------- init ---------- */

  function init() {
    var slug = pageName(location.pathname);
    if (!slug) return;
    state.slug = slug;
    state.speed = loadSpeed();
    var mp = loadMusic();
    state.musicTrack = mp.track;
    state.musicMuted = mp.muted;
    /* Enumerate before any UI is injected, so injected UI never enters
       the enumeration. */
    state.units = enumerateUnits();
    for (var i = 0; i < state.units.length; i++) state.unitsById[state.units[i].id] = state.units[i];
    var ensured = ensureRow();
    if (!ensured) return;
    var row = ensured.row;
    var wtSpan = ensured.wtSpan;
    var st = document.createElement('style');
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
    var entry = WALKTHROUGHS[slug];
    if (!entry) {
      /* Setup removal of our own span happens at once. */
      removeSpanNow(wtSpan);
      bindScroll();
      return;
    }
    state.entry = entry;
    askCachedOnInit();
    var ph = button('Loading walkthrough…', false);
    ph.disabled = true;
    wtSpan.appendChild(ph);
    bindScroll();
    var outerTimer = setTimeout(function () {
      if (!state.validationDone) {
        state.validationDone = true;
        validationFailed(row, wtSpan, 'validation timed out after 10 seconds');
      }
    }, OUTER_MS);
    Promise.all([validateSidecar(entry), validateStale(entry)]).then(function (results) {
      clearTimeout(outerTimer);
      state.validationDone = true;
      state.sidecar = results[0];
      showLiveButton(wtSpan);
      startPrecompute();
    }).catch(function (e) {
      clearTimeout(outerTimer);
      state.validationDone = true;
      validationFailed(row, wtSpan, e && e.message ? e.message : 'validation failed');
    });
  }

  /* Test hook for the live checks. Resolves a synthetic segment through
     the real resolveSegment and places the marker, so a check can verify
     the mechanism (for example an equation line) without a rebuilt
     sidecar. Read only in practice: it never writes the sidecar. */
  window.__wtTest = {
    resolveSegment: resolveSegment,
    placeMarker: placeMarker,
    elementNameFor: elementNameFor,
    state: state
  };

  function safeInit() { try { registerWorker(); init(); } catch (e) { /* nothing renders */ } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeInit);
  else safeInit();
})();
