# raminaeye.github.io

Source for [raminaeye.github.io](https://raminaeye.github.io), Ramin Anushiravani's personal site. Its main part is a catalog of 44 hands-on machine learning tutorials with interactive demos that run in the browser.

## What's inside

- `index.html` is the home page
- `tutorial.html` is the tutorial catalog, and each tutorial is its own HTML file
- `cv.html` is the CV
- `pubs.html` lists patents, papers and slides
- `work.html` lists projects and their repos

## How to run

The site is plain static HTML with no build step. Open any HTML file in a browser, or serve the folder:

```bash
python3 -m http.server
```

Every push to `main` deploys to GitHub Pages.
