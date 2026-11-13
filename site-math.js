/* site-math.js: the one math renderer for raminaeye.github.io tutorials (P88).
   Ramin 2026-11-08: "all your equations should be shown in proper latex".
   KaTeX 0.16.11 from jsDelivr (pinned, SRI hashes), loaded in the reader's browser. Renders \( \) inline
   and \[ \] display math anywhere in the page body. eq-line math is written as
   \(\displaystyle ...\) so it stays inline-mode and may wrap after top-level
   relations and operators on a phone. Colours: \htmlClass / \htmlStyle only.
   Tools that write math into the page call siteMath.typeset(el) after each update.
   One writer: the P87/P88 sweep (branch p87-math). Without JS the raw TeX shows. */
(function () {
  'use strict';
  var V = '0.16.11';
  var BASE = 'https://cdn.jsdelivr.net/npm/katex@' + V + '/dist/';
  var SRI = {
    'katex.min.css': 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
    'katex.min.js': 'sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg',
    'contrib/auto-render.min.js': 'sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk'
  };
  var queue = [];
  var ready = false;

  var OPTS = {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'option', 'svg'],
    ignoredClasses: ['no-math'],
    throwOnError: false,
    strict: 'ignore',
    trust: function (ctx) {
      return ctx.command === '\\htmlClass' || ctx.command === '\\htmlStyle' ||
             ctx.command === '\\htmlData';
    },
    macros: {
      '\\R': '\\mathbb{R}',
      '\\E': '\\mathbb{E}',
      '\\T': '^{\\mathsf{T}}'
    }
  };

  function render(el) {
    if (!el) return;
    try { window.renderMathInElement(el, OPTS); } catch (e) { /* leave raw TeX */ }
  }

  function typeset(el) {
    if (ready) render(el || document.body); else queue.push(el || document.body);
  }

  window.siteMath = { typeset: typeset, options: OPTS };

  function load(file, cb) {
    var s = document.createElement('script');
    s.src = BASE + file; s.integrity = SRI[file]; s.crossOrigin = 'anonymous'; s.async = false;
    s.onload = cb || null;
    document.head.appendChild(s);
  }

  var css = document.createElement('link');
  css.rel = 'stylesheet'; css.crossOrigin = 'anonymous';
  css.integrity = SRI['katex.min.css'];
  css.href = BASE + 'katex.min.css';
  document.head.appendChild(css);

  /* Contain KaTeX's hidden accessibility span (2026-11-13, contrast-leftovers).
     KaTeX renders each formula as <span class="katex"><span class="katex-mathml">
     (position:absolute, clipped to 1px, screen-reader only) + <span
     class="katex-html"> (the visible math). .katex itself is unpositioned,
     so the mathml span's containing block is the document: inside a
     horizontal scroll container (.qtab-wrap, table:has(td code), any
     overflow-x:auto wrapper that is itself unpositioned) the visible math
     is clipped by the wrapper but the invisible span escapes it and
     expands the document scrollWidth. Seen live at 360 px on tsne.html
     (29 px, span inside a diag-table cell in .qtab-wrap) and svm.html
     (25 px, span inside a diag-table cell in a display:block table with
     overflow-x:auto); a site-wide render survey of all 183 pages found
     no other instance, and the tab-strip case (DIV.tab-strip, already
     position:relative) proves the positioned-container fix. Making .katex
     position:relative (no offsets, so no visual change) makes each
     formula its span's containing block, so the wrapper clips the span
     exactly like the visible math. The rule lives here, in the one shared
     include, so it covers every present and future instance; without JS
     there is no KaTeX and no overflow, so the rule is inert there. */
  var contain = document.createElement('style');
  contain.textContent = '.katex{position:relative}';
  document.head.appendChild(contain);

  load('katex.min.js');
  load('contrib/auto-render.min.js', function () {
    function go() {
      ready = true;
      render(document.body);
      var q = queue; queue = [];
      for (var i = 0; i < q.length; i++) if (q[i] !== document.body) render(q[i]);
      document.dispatchEvent(new Event('sitemath:ready'));
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
    else go();
  });
})();
