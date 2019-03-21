# Full-Text Search in JavaScript

The following repository contains the implementation of a search engine based on `Okapi BM25`, a ranking function representing a modern approach for query searches and document retrieval based on `TF-IDF` term scoring.

The motivation is to understand what composes text search and how search as a service (e.g. Google) and as software tools (e.g Elasticsearch) use certain algorithms to optimise their search capabilities.

For the corpus of searchable text data a web scraping class powered by puppeteer is used. It allows to run a script to scrape the data from a given the website URL and some other parameters. It has the capability to go through an infinite scroll page and fetch the text until the desired amount is met.

## Instructions
1. Install packages using `yarn` or `npm`

### For development
2. Run tests in watch mode with `yarn test`
3. Run scrape script with `yarn scrape`
4. Run search server with `yarn dev`

### For production
5. Build application with `yarn build`
6. Start application with `yarn start`