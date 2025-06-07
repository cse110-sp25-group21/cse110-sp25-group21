/**
 * @jest-environment node
 * 
 * run using: npm test landingToDeck.puppeteer.test.js
 *
 * this tests:
 *   1) load landingPage.html
 *   2) navigate to card-deck.html
 *   3) click the “Edit” button and verify it toggles to “Done” then back to “Edit”
 */

const puppeteer = require('puppeteer');
const { resolve } = require('path');
const { pathToFileURL } = require('url');

const NAV_WAIT_UNTIL   = 'domcontentloaded';
const NAV_TIMEOUT      = 20000;
const SELECTOR_TIMEOUT =  5000;

describe('E2E: landingPage → card-deck Edit/Done toggle', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security']
    });
    page = await browser.newPage();
  }, NAV_TIMEOUT);

  afterAll(async () => {
    await browser.close();
  });

  test(
    'navigates from landing to card-deck and toggles Edit/Done',
    async () => {
      // load landingPage.html
      const landingFile = resolve(__dirname, '../src/frontend/landingPage.html');
      const landingUrl  = pathToFileURL(landingFile).href;
      await page.goto(landingUrl, { waitUntil: NAV_WAIT_UNTIL, timeout: NAV_TIMEOUT });

      // verify “Decks” link exists
      const deckLinkSel = 'a[href*="card-deck.html"]';
      await page.waitForSelector(deckLinkSel, { timeout: SELECTOR_TIMEOUT });
      const linkText = await page.$eval(deckLinkSel, el => el.textContent.trim());
      expect(linkText).toBe('Decks');

      // navigate to card-deck.html
      const deckFile = resolve(__dirname, '../src/frontend/card-deck.html');
      const deckUrl  = pathToFileURL(deckFile).href;
      await page.goto(deckUrl, { waitUntil: NAV_WAIT_UNTIL, timeout: NAV_TIMEOUT });
      expect(page.url().endsWith('card-deck.html')).toBe(true);

      // toggle the Edit/Done button
      const editBtnSel = '.edit-button';
      await page.waitForSelector(editBtnSel, { timeout: SELECTOR_TIMEOUT });

      // initial state is “Edit”
      let txt = await page.$eval(editBtnSel, el => el.textContent.trim());
      expect(txt).toBe('Edit');

      // click → wait for “Done”
      await page.click(editBtnSel);
      await page.waitForFunction(
        sel => document.querySelector(sel)?.textContent.trim() === 'Done',
        { timeout: SELECTOR_TIMEOUT },
        editBtnSel
      );
      txt = await page.$eval(editBtnSel, el => el.textContent.trim());
      expect(txt).toBe('Done');

      // click again → wait for “Edit”
      await page.click(editBtnSel);
      await page.waitForFunction(
        sel => document.querySelector(sel)?.textContent.trim() === 'Edit',
        { timeout: SELECTOR_TIMEOUT },
        editBtnSel
      );
      txt = await page.$eval(editBtnSel, el => el.textContent.trim());
      expect(txt).toBe('Edit');
    },
    NAV_TIMEOUT
  );
});