/**
 * @jest-environment node
 *
 * run using: npm test addDeck.e2e.test.js
 *
 * this tests:
 *   1) load landingPage.html
 *   2) click Decks in the header
 *   3) click the + add-card link → deck-form.html
 *   4) type a test deck name into #deck-name
 *   5) accept the alert “deck added”
 *   6) redirect back to card-deck.html, verify a card-title matches the test name
 */

const puppeteer = require('puppeteer');
const { resolve } = require('path');
const { pathToFileURL } = require('url');

const NAV_WAIT = 'domcontentloaded';
const NAV_TIMEOUT = 20000;
const SELECT_TIMEOUT =  5000;

describe('end to end test: add new deck and verify on card-deck page', () => {
  let browser;
  let page;
  const testDeckName = 'TestDeck123';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security'],
    });
    page = await browser.newPage();

    // prevent external CSS and fonts from blocking the test
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (['stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }, NAV_TIMEOUT);

  afterAll(async () => {
    await browser.close();
  });

  test(
    'landingPage to card-deck to deck-form to add deck to see deck on card-deck',
    async () => {
      // load landingPage.html
      const landingFile = resolve(__dirname, '../src/frontend/landingPage.html');
      const landingUrl  = pathToFileURL(landingFile).href;
      await page.goto(landingUrl, { waitUntil: NAV_WAIT, timeout: NAV_TIMEOUT });

      // click Decks in the header (navigate to card-deck.html)
      const cardDeckFile = resolve(__dirname, '../src/frontend/card-deck.html');
      const cardDeckUrl  = pathToFileURL(cardDeckFile).href;
      await page.waitForSelector('a[href*="card-deck.html"]', { timeout: SELECT_TIMEOUT });
      await page.goto(cardDeckUrl, { waitUntil: NAV_WAIT, timeout: NAV_TIMEOUT });

      // click the “+” add-card link → deck-form.html
      const deckFormFile = resolve(__dirname, '../src/frontend/deck-form.html');
      const deckFormUrl  = pathToFileURL(deckFormFile).href;
      await page.waitForSelector('a.card.add-card', { timeout: SELECT_TIMEOUT });
      await Promise.all([
        page.click('a.card.add-card'),
        page.waitForNavigation({ waitUntil: NAV_WAIT, timeout: NAV_TIMEOUT }),
      ]);

      // type a test deck name into #deck-name
      await page.waitForSelector('#deck-name', { timeout: SELECT_TIMEOUT });
      await page.click('#deck-name');
      await page.type('#deck-name', testDeckName);

      // accept the alert “deck added”
      page.once('dialog', dialog => dialog.accept());
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: NAV_WAIT, timeout: NAV_TIMEOUT }),
      ]);

      // verify a .card-title matches the test deck name
      await page.waitForFunction(
        name => Array.from(document.querySelectorAll('.card-title'))
                       .some(el => el.textContent.trim() === name),
        { timeout: NAV_TIMEOUT },
        testDeckName
      );

      const exists = await page.evaluate(name =>
        Array.from(document.querySelectorAll('.card-title'))
             .some(el => el.textContent.trim() === name),
        testDeckName
      );
      expect(exists).toBe(true);
    },
    NAV_TIMEOUT
  );
});
