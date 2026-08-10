# Timothy Macfarlane

This repository contains Timothy Macfarlane's professional reputation site at [thecyberlocal.github.io](https://thecyberlocal.github.io/).

The site is a dependency-free, multi-page static build. Shared templates live in `scripts/build.mjs`; generated HTML is committed at the repository root so GitHub Pages can serve each route directly.

## Local commands

```sh
npm run build
npm test
```

Any static file server can serve the repository root after a build.

## Content and asset notes

- `assets/images/timothy-macfarlane.jpg` is Timothy's existing authentic photo. CSS supplies the 4:5 editorial crop without altering or fabricating the portrait.
- Agent Portal material is intentionally limited to publicly safe architecture and engineering reasoning. Private source, credentials, production data, customer details, and proprietary operational specifics are excluded.
- STRling's product and documentation site remains canonical at [strling-lang.netlify.app](https://strling-lang.netlify.app/).

## Verification

`npm test` rebuilds the site and checks required routes, internal references, image paths, unique metadata, canonical URLs, JSON-LD, public identity links, navigation fundamentals, forbidden employment language, and the repository-wide em dash constraint.
