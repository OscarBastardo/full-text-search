# Full-Text Search in JavaScript

The following repository contains the implementation of a search engine based on `Okapi BM25`, a ranking function representing a modern approach for query searches and document retrieval based on `TF-IDF` term scoring.

The motivation for this project is to understand what comprises text search and how search as a service (e.g. Google) and as software tools (e.g Elasticsearch) use certain algorithms to optimise their search capabilities.

For the corpus of searchable text data a web scraping class powered by puppeteer is used. It allows to run a script to scrape the data from a given the website URL and some other parameters. It has the capability to go through an infinite scroll page and fetch the text until the desired amount is met.

## Instructions

To install node packages:
1. Run `yarn` or `npm`

To set the environmental variables:
1. Run `cp .env.example .env`
2. Verify the `.env` file variables and modify them accordingly

To scrape a website:
1. Make sure the scraping-related variables are set to the desired values
2. Run `yarn scrape`

### Run search server with Docker
Make sure you have Docker client installed in your dev machine.

To run dev server in watch mode:
1. Run `docker-compose up`
2. It will listen to port `4000` by default

To use the production container:
1. Run `docker build -t full-text-search .` and wait for it to build
2. Run `docker run -it -p 4000:4000/tcp full-text-search:latest`
2. It will listen to port `4000` by default


### Run locally

For development:
1. Run linter with `yarn lint`
2. Run tests in watch mode with `yarn test`
3. Run in watch mode with `yarn dev`

For production:
- Build application with `yarn build`
- Start application with `yarn start`