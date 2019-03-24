import * as dotenv from 'dotenv';
import * as fs from 'fs';

import BM25 from 'src/search/BM25';
import tokenizer from 'src/search/tokenizer';
import { TextLinkItem } from 'src/scraper/InfiniteScrollScraper';

dotenv.config();

const setupStore = () => {
  const k1 = parseInt(process.env.SEARCH_K1, 10);
  const b = parseInt(process.env.SEARCH_B, 10);
  const bm25 = new BM25(tokenizer, k1, b);

  const items = (() => {
    const data = fs.readFileSync(process.env.SCRAPE_STORAGE_PATH, 'utf-8');
    return JSON.parse(data);
  })();

  items.forEach((document: TextLinkItem, index: number) => {
    bm25.addDocument({
      id: index,
      body: document.text,
      link: document.link,
    });
  });

  bm25.updateIdf();

  return bm25;
};

export default setupStore;
