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
    "rl-methods.html": {"audio": "podcasts/rl-methods-walkthrough.mp3?v=b7697d16", "sidecar": "podcasts/rl-methods-walkthrough-sidecar.json?v=b7697d16", "script": "podcasts/rl-methods-walkthrough-script.json?v=b7697d16", "version": "b7697d16", "fingerprint": "9639dd109f8ecbebf7f02fcde383a3b12f083123fe30e19b24c650f98e2bb2b9", "formatVersion": 1, "totalSecs": 1507},
    "rl-policy-gradients.html": {"audio": "podcasts/rl-policy-gradients-walkthrough.mp3?v=0207c126", "sidecar": "podcasts/rl-policy-gradients-walkthrough-sidecar.json?v=0207c126", "script": "podcasts/rl-policy-gradients-walkthrough-script.json?v=0207c126", "version": "0207c126", "fingerprint": "ca28c2fe39090e0be2761166e06f7322691d74ca5dbab097f359cf5ed1cf6eaf", "formatVersion": 1, "totalSecs": 2051}
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
  var WORST_PODCAST = 'Resume podcast (27:55 of 28 min)';
  var WORST_WALKTHROUGH = 'Resume walkthrough (71:55 of 72 min)';
  var WORST_NOTEBOOKLM = 'Listen on NotebookLM Opens in NotebookLM.';

  var CSS =
    '.pc-row{margin:.75rem 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .6rem;color-scheme:light}' +
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
    '@media (max-width:640px){.pc-row{flex-direction:column;align-items:stretch}.pc-row>span{width:100%}}' +
    '@media print{.pc-row{display:none}.wt-marker{display:none!important}.wt-section-current{outline:none!important}.wt-bar{display:none!important}.wt-sheet{display:none!important}.wt-panel{display:none!important}}' +
    '.wt-section-current{outline:2px solid #d97706;outline-offset:2px}' +
    '.wt-marker{position:absolute;width:12px;height:12px;pointer-events:none;z-index:54;color:inherit}' +
    '.wt-marker svg{width:12px;height:12px;display:block}' +
    '.wt-bar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;color:#111;' +
    'border-top:1px solid #999;padding:.5rem .75rem;display:flex;flex-direction:column;gap:.4rem;align-items:stretch;' +
    'font:inherit;font-size:1rem;line-height:1.3;box-sizing:border-box}' +
    '.wt-bar button{font:inherit;cursor:pointer;background:#fff;color:#1f618d;border:1px solid #1f618d;border-radius:8px;padding:.35rem .6rem;min-height:36px}' +
    '.wt-bar button[disabled]{opacity:.5;cursor:default}' +
    '.wt-bar button:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-bar-main{display:flex;flex-wrap:nowrap;gap:.4rem .6rem;align-items:center;min-width:0}' +
    '.wt-bar-main button{flex:none}' +
    '.wt-bar-title{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.wt-bar-elem{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:30vw}' +
    '.wt-bar-pos{white-space:nowrap;font-variant-numeric:tabular-nums;flex:none}' +
    '.wt-bar-speed{font:inherit;color:#1f618d;background:#fff;border:1px solid #1f618d;border-radius:8px;padding:.35rem .3rem;min-height:36px;cursor:pointer;flex:none}' +
    '.wt-bar-speed:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-bar-row3{display:flex;gap:.5rem;flex-wrap:wrap}' +
    '.wt-bar.wt-min .wt-bar-main>*:not(.wt-bar-play):not(.wt-bar-minbtn){display:none}' +
    '.wt-bar.wt-min{padding:.25rem .5rem}' +
    '.wt-bar.wt-min .wt-bar-play,.wt-bar.wt-min .wt-bar-minbtn{min-height:28px;padding:.25rem .5rem}' +
    '.wt-bar .wt-short{display:none}' +
    '@media (max-width:480px){.wt-bar{font-size:.85rem;padding:.4rem .5rem}.wt-bar-main{gap:.3rem .4rem}.wt-bar-elem{display:none}.wt-bar button{padding:.3rem .45rem;min-height:32px}.wt-bar-speed{padding:.3rem .2rem;min-height:32px}.wt-bar .wt-full{display:none}.wt-bar .wt-short{display:inline}}' +
    '.wt-sheet{position:fixed;left:0;right:0;z-index:55;background:#fff;color:#111;border-top:1px solid #999;' +
    'max-height:60vh;overflow:auto;padding:1rem;box-sizing:border-box}' +
    '.wt-sheet h2{font-size:1.1rem;margin:.2rem 0 .6rem}' +
    '.wt-sheet ul{list-style:none;margin:0;padding:0}' +
    '.wt-sheet li{margin:.15rem 0}' +
    '.wt-sheet button{font:inherit;cursor:pointer;background:none;border:0;color:#1f618d;text-align:left;padding:.3rem 0}' +
    '.wt-sheet button:focus-visible{outline:2px solid #1f618d;outline-offset:2px}' +
    '.wt-sheet .wt-sub{padding-left:1.2rem;font-size:.95rem}' +
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
        var labeled = labels.indexOf('Intuition') >= 0 || labels.indexOf('The mathematics') >= 0 || labels.indexOf('Example') >= 0;
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
    barTitle: null,
    barElem: null,
    barPos: null,
    barPlay: null,
    barBack: null,
    barNext: null,
    stepUnits: null,
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
  };

  function slugKey() { return 'wt:pos:' + (state.slug || ''); }

  function elementNameFor(seg, unit) {
    if (!seg) return '';
    var kind = seg.kind || (unit && unit.kind) || '';
    if (kind === 'figure') return seg.element || 'Figure';
    if (kind === 'equation' || kind === 'eqwhy' || kind === 'intuition' || kind === 'example') return seg.element || 'Equation';
    if (kind === 'code') return 'Code';
    if (kind === 'table') return seg.element || 'Table';
    if (kind === 'tool') return 'Demo';
    if (kind === 'step_list') return 'Steps';
    if (kind === 'section_title' || kind === 'subhead') return seg.element || (unit && unit.el ? (unit.el.textContent || '').replace(/\s+/g, ' ').trim() : '');
    return '';
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

  function ensureRow() {
    var row = document.querySelector('.pc-row');
    var created = false;
    if (!row) {
      var h1 = document.querySelector('h1');
      if (!h1) return null;
      row = document.createElement('div');
      row.className = 'pc-row';
      var a = anchorAfter(h1);
      a.parentNode.insertBefore(row, a.nextSibling);
      created = true;
    }
    var pcSpan = findSpan(row, 'podcast');
    var wtSpan = findSpan(row, 'walkthrough');
    var nbSpan = findSpan(row, 'notebooklm');
    if (!pcSpan && !wtSpan && !nbSpan) {
      /* A row the podcast player built in its old shape holds its button
         directly. Keep that content first and add the walkthrough span
         in the second position. */
      var oldChildren = Array.prototype.slice.call(row.children);
      pcSpan = makeSpan('podcast');
      wtSpan = makeSpan('walkthrough');
      nbSpan = makeSpan('notebooklm');
      while (row.firstChild) row.removeChild(row.firstChild);
      row.appendChild(pcSpan);
      row.appendChild(wtSpan);
      row.appendChild(nbSpan);
      for (var ci = 0; ci < oldChildren.length; ci++) pcSpan.appendChild(oldChildren[ci]);
    } else {
      if (!pcSpan) { pcSpan = makeSpan('podcast'); row.insertBefore(pcSpan, row.firstChild); }
      if (!wtSpan) {
        wtSpan = makeSpan('walkthrough');
        if (pcSpan.nextSibling) row.insertBefore(wtSpan, pcSpan.nextSibling);
        else row.appendChild(wtSpan);
      }
      if (!nbSpan) { nbSpan = makeSpan('notebooklm'); row.appendChild(nbSpan); }
    }
    if (created) {
      sizeSpan(pcSpan, WORST_PODCAST, row);
      sizeSpan(wtSpan, WORST_WALKTHROUGH, row);
      sizeSpan(nbSpan, WORST_NOTEBOOKLM, row);
    } else {
      /* Size any span this player just created, so a taken-over row is
         still sized from worst-case content. */
      if (!pcSpan.style.minWidth) sizeSpan(pcSpan, WORST_PODCAST, row);
      if (!wtSpan.style.minWidth) sizeSpan(wtSpan, WORST_WALKTHROUGH, row);
      if (!nbSpan.style.minWidth) sizeSpan(nbSpan, WORST_NOTEBOOKLM, row);
    }
    if (created) {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          if (!state.validationDone) {
            sizeSpan(pcSpan, WORST_PODCAST, row);
            sizeSpan(wtSpan, WORST_WALKTHROUGH, row);
            sizeSpan(nbSpan, WORST_NOTEBOOKLM, row);
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
    removeSpanDeferred(wtSpan);
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
      if (!verify) return;
      state.hashVerified = true;
      var seg = state.currentSeg;
      if (seg) {
        var unit = resolveSegment(seg);
        if (unit) {
          var expected = byId[unit.id] && byId[unit.id].hash;
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

  /* Resolution order, per the identification standard: a domId first,
     where the unit carries one and domId_missing is not set; then the
     elementRef fallback; then the ordinal fallback. A unit with
     domId_missing set must never resolve by domId even if a domId value
     is present; it goes straight to the elementRef fallback. The
     paragraph_id values on transcript units are transcript-side labels,
     not page ids, and the player never queries the DOM for them. */
  function resolveSegment(seg) {
    if (!seg) return null;
    if (seg.paragraphId && state.unitsById[seg.paragraphId]) return state.unitsById[seg.paragraphId];
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
    state.markerEl.style.left = Math.max(0, left) + 'px';
    state.markerEl.style.top = Math.max(0, top) + 'px';
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
    if (state.barTitle) {
      var chapters = state.sidecar.chapters || [];
      var ch = null;
      for (var i = 0; i < chapters.length; i++) if (chapters[i].sectionIndex === sectionIndex) ch = chapters[i];
      state.barTitle.textContent = ch ? (ch.title || '') : (target ? (target.textContent || '').replace(/\s+/g, ' ').trim() : '');
    }
  }

  function barHeight() { return state.bar ? state.bar.offsetHeight : 0; }

  function sheetHeight() {
    if (state.chaptersSheet && state.chaptersSheet.parentNode) return state.chaptersSheet.offsetHeight;
    if (state.transcriptPanel && state.transcriptPanel.parentNode && window.innerWidth <= 640) return state.transcriptPanel.offsetHeight;
    return 0;
  }

  function visibleBottom() {
    return window.innerHeight - barHeight() - sheetHeight();
  }

  function scrollToElement(el) {
    var r = el.getBoundingClientRect();
    var bottom = visibleBottom();
    if (r.top >= 0 && r.bottom <= bottom) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var delta;
    if (r.height <= bottom) delta = r.top - 8;
    else if (r.top < 0) delta = r.top - 8;
    else delta = r.bottom - bottom + 8;
    state.progScroll = true;
    window.scrollBy({ top: delta, behavior: reduced ? 'auto' : 'smooth' });
    scheduleProgScrollClear();
  }

  function scheduleProgScrollClear() {
    clearTimeout(state.scrollTimer);
    if ('onscrollend' in window) {
      var onEnd = function () {
        state.progScroll = false;
        window.removeEventListener('scrollend', onEnd);
      };
      window.addEventListener('scrollend', onEnd);
    } else {
      state.scrollTimer = setTimeout(function () { state.progScroll = false; }, 500);
    }
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
      placeMarker(unit);
      if (state.following && changed && !samePara) scrollToElement(unit.el);
      if (state.barElem) state.barElem.textContent = elementNameFor(seg, unit);
    } else {
      clearMarker();
      if (state.barElem) state.barElem.textContent = '';
    }
    if (state.barPos) state.barPos.textContent = posText(t);
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
    if (!state.barTitle) return;
    var el = p.element || {};
    var name = (el.kind || 'element') + (el.id ? ' ' + el.id : '');
    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
    live.textContent = 'Audio paused for a try-it on ' + name + '.';
    state.bar.appendChild(live);
    setTimeout(function () { if (live.parentNode) live.parentNode.removeChild(live); }, 5000);
  }

  /* ---------- step buttons: previous and next thing to read ---------- */

  /* The readable units, in document order, that carry at least one
     segment. A thing to read is one of these units. Computed once; the
     page does not change while the walkthrough runs. */
  function stepUnits() {
    if (state.stepUnits) return state.stepUnits;
    var byUnit = {};
    var segs = state.sidecar.segments || [];
    for (var i = 0; i < segs.length; i++) {
      var u = resolveSegment(segs[i]);
      if (u && !byUnit[u.id]) byUnit[u.id] = u;
    }
    var list = state.units.filter(function (u) { return byUnit[u.id]; });
    state.stepUnits = list;
    return list;
  }

  function currentStepIndex() {
    var seg = state.currentSeg;
    if (!seg && state.audio) seg = segmentAt(state.audio.currentTime);
    if (!seg) return -1;
    var unit = resolveSegment(seg);
    if (!unit) return -1;
    var list = stepUnits();
    for (var i = 0; i < list.length; i++) if (list[i] === unit) return i;
    return -1;
  }

  function updateStepButtons() {
    if (!state.barBack || !state.barNext) return;
    var idx = currentStepIndex();
    var list = stepUnits();
    state.barBack.disabled = idx <= 0;
    state.barNext.disabled = idx < 0 || idx >= list.length - 1;
  }

  function stepTo(dir) {
    if (!state.audio) return;
    var list = stepUnits();
    if (!list.length) return;
    var cur = currentStepIndex();
    var next = dir > 0 ? (cur < 0 ? 0 : cur + 1) : (cur < 0 ? list.length - 1 : cur - 1);
    if (next < 0 || next >= list.length) return;
    var seg = firstSegmentForUnit(list[next]);
    if (!seg) return;
    state.following = true;
    showRow3('none');
    state.audio.currentTime = seg.startSeconds;
    state.audio.play();
    updateStepButtons();
  }

  /* Position readout. Below 480 pixels the bar shows the current time
     only; the total stays in the top button and in the full bar at wider
     widths, so the one line still fits. */
  function posText(t) {
    if (window.innerWidth <= 480) return fmt(t);
    return fmt(t) + ' / ' + fmt(state.sidecar.totalSeconds);
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
    play.textContent = 'Pause';
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
    nextBtn.addEventListener('click', function () { stepTo(1); });
    var title = document.createElement('span');
    title.className = 'wt-bar-title';
    title.setAttribute('aria-live', 'polite');
    var elem = document.createElement('span');
    elem.className = 'wt-bar-elem';
    var pos = document.createElement('span');
    pos.className = 'wt-bar-pos';
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
    var trBtn = document.createElement('button');
    trBtn.type = 'button';
    var trFull = document.createElement('span');
    trFull.className = 'wt-full';
    trFull.textContent = 'Transcript';
    var trShort = document.createElement('span');
    trShort.className = 'wt-short';
    trShort.textContent = 'Text';
    trBtn.appendChild(trFull);
    trBtn.appendChild(trShort);
    trBtn.addEventListener('click', function () { toggleTranscript(trBtn); });
    var minBtn = document.createElement('button');
    minBtn.type = 'button';
    minBtn.className = 'wt-bar-minbtn';
    minBtn.setAttribute('aria-label', 'Minimize player');
    minBtn.textContent = '▾';
    minBtn.addEventListener('click', function () { toggleMinimize(); });
    var row3 = document.createElement('div');
    row3.className = 'wt-bar-row3';
    row3.style.display = 'none';
    main.appendChild(backBtn);
    main.appendChild(play);
    main.appendChild(nextBtn);
    main.appendChild(title);
    main.appendChild(elem);
    main.appendChild(pos);
    main.appendChild(speedSel);
    main.appendChild(chaptersBtn);
    main.appendChild(trBtn);
    main.appendChild(minBtn);
    bar.appendChild(main);
    bar.appendChild(row3);
    var row = document.querySelector('.pc-row');
    if (row && row.parentNode) row.parentNode.insertBefore(bar, row.nextSibling);
    else document.body.insertBefore(bar, document.body.firstChild);
    state.bar = bar;
    state.barTitle = title;
    state.barElem = elem;
    state.barPos = pos;
    state.barPlay = play;
    state.barBack = backBtn;
    state.barNext = nextBtn;
    state.barMinBtn = minBtn;
    state.barSpeed = speedSel;
    state.row3 = row3;
    state.chaptersBtn = chaptersBtn;
    state.transcriptBtn = trBtn;
    updateStepButtons();
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
    if (kind === 'none') { state.row3.style.display = 'none'; return; }
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
    if (kind === 'jump' || kind === 'both') {
      mkBtn('Back to the audio', function () {
        state.following = true;
        showRow3(state.tryIt ? 'tryit' : 'none');
        if (state.markedEl) scrollToElement(state.markedEl);
      });
      if (kind === 'jump') {
        var playHere = mkBtn('Play from this paragraph', function () {
          var unit = topVisibleUnit();
          if (!unit) return;
          var seg = firstSegmentForUnit(unit);
          if (!seg) return;
          state.following = true;
          showRow3('none');
          if (state.audio) {
            state.audio.currentTime = seg.startSeconds;
            state.audio.play();
          }
        });
        if (!topVisibleUnit()) playHere.disabled = true;
      }
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
    for (var i = 0; i < state.units.length; i++) {
      var u = state.units[i];
      if (u.kind === 'section_title' || u.kind === 'subhead') continue;
      var r = u.el.getBoundingClientRect();
      var visTop = Math.max(0, r.top);
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
      var resolved = resolveSegment(s);
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
    chapters.forEach(function (ch) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = ch.title || ('Section ' + (ch.sectionIndex + 1));
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
      clear(slugKey());
      clearMarker();
      if (state.outlinedEl) state.outlinedEl.classList.remove('wt-section-current');
      state.outlinedEl = null;
      state.currentSection = -1;
      if (state.bar && state.bar.parentNode) state.bar.parentNode.removeChild(state.bar);
      state.bar = null;
      state.audio = null;
      refreshTopButton();
    });
    au.addEventListener('error', function () {
      state.playing = false;
      if (state.bar) {
        state.barTitle.textContent = 'The walkthrough could not load.';
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
    if (!state.audio) {
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
      au.play();
      if (!state.rafId) state.rafId = requestAnimationFrame(rafLoop);
      state.following = true;
      return;
    }
    togglePlay();
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

  function safeInit() { try { init(); } catch (e) { /* nothing renders */ } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeInit);
  else safeInit();
})();
