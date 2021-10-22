# Article Archiver ![production](https://github.com/chrisodicho/article-archiver/actions/workflows/prod.workflow.yml/badge.svg)

The purpose of this library is to convert online articles and blog posts into local markdown by only preserving:

- article content
- media assets
- meta data

The heavy lifting around scraping is done with [Cypress](https://www.cypress.io/) and the content is enhanced with [Mozilla Readability](https://github.com/mozilla/readability).

---

# Getting Started

⚠️ This library is under development and not expected to work until the TODO's are completed ⚠️

- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [TODO](#todo)

# Installation

```bash
npm install -g article-archiver
```

# Usage

```bash
npx article-archiver <urls>
```

# Architecture

![Architecture](docs/architecture.jpg)

# TODO

- [x] setup cypress
- [x] configure cypress to scrape URL's
- [x] implement code cleaner and enhancer
- [ ] implement readability
- [ ] wire up scraper to enhancer
- [ ] setup http server for tmp files
- [ ] setup website-scraper
- [ ] wire up archiver to save local assets to tmp folder
- [ ] setup utf8 and turndown transformers
- [ ] wire up transformer to merge meta data and write to output
