import * as dotenv from "dotenv";
import * as fs from "fs";

import BM25 from "src/search/BM25";
import tokenizer from "src/search/tokenizer";
import { TextLinkItem } from "src/scraper/TextLinkScraper";

dotenv.config();

const k1 = parseInt(process.env.SEARCH_K1, 10);
const b = parseInt(process.env.SEARCH_B, 10);

const items = (() => {
  const data = fs.readFileSync(process.env.SCRAPE_STORAGE_PATH, "utf-8");
  return JSON.parse(data);
})();

const search = new BM25(tokenizer, k1, b);

items.forEach((document: TextLinkItem, index: number) => {
  search.addDocument({
    id: index,
    body: document.text,
    link: document.link,
  });
});
