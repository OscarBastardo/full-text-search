import * as fs from "fs";
import { Page } from "puppeteer";
// tslint:disable-next-line: no-var-requires
const puppeteer = require("puppeteer");

export interface TextLinkItem {
  text: string;
  link: string;
}

class TextLinkScraper {
  private url: string;
  private querySelector: string;
  private itemTargetCount: number;
  private storagePath: string;

  constructor(
    url: string,
    querySelector: string,
    itemTargetCount: number,
    storagePath: string,
  ) {
    this.url = url;
    this.querySelector = querySelector;
    this.itemTargetCount = itemTargetCount;
    this.storagePath = storagePath;
  }

  public async run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1366, height: 768});
    await page.goto(this.url);
    const items: TextLinkItem[] = await this.scrapeInfiniteScrollItems(page);
    const json = JSON.stringify(items, null, 2);
    fs.writeFileSync(this.storagePath, json, "utf8");
    await browser.close();
  }

  private async scrapeInfiniteScrollItems(
    page: Page,
    scrollDelay = 1000,
  ): Promise<TextLinkItem[]> {
    let items = [];
    try {
      let previousHeight: number;
      while (items.length < this.itemTargetCount) {
        items = await page.evaluate(this.extractItems, this.querySelector);
        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        await page.waitFor(scrollDelay);
      }
    } catch (e) { return; }
    return items;
  }

  private extractItems(selector: string) {
    const extractedElements = document.querySelectorAll(selector);
    const items: TextLinkItem[] = [];
    for (const element of extractedElements) {
      const text = element.textContent;
      const link = element.closest("a").href;
      items.push({ text, link });
    }
    return items;
  }
}

export default TextLinkScraper;
