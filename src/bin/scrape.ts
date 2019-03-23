import * as dotenv from 'dotenv';
import TextLinkScraper from 'src/scraper/TextLinkScraper';

dotenv.config();

const url = process.env.SCRAPE_URL;
const querySelector = process.env.SCRAPE_QUERY_SELECTOR;
const itemTargetCount = parseInt(process.env.SCRAPE_ITEM_TARGET_COUNT, 10);
const storagePath = process.env.SCRAPE_STORAGE_PATH;

const scraper = new TextLinkScraper(
  url,
  querySelector,
  itemTargetCount,
  storagePath,
);

scraper.run();
