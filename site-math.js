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
