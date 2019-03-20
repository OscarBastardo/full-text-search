import TextLinkScraper from "./TextLinkScraper";

const url = "https://www.reddit.com/r/todayilearned/";
const querySelector = "h2";
const itemTargetCount = 10000;
const storagePath = './src/data/scraped.json';
const scraper = new TextLinkScraper(
  url,
  querySelector,
  itemTargetCount,
  storagePath
);

export default scraper;
