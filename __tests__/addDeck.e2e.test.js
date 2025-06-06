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
const path = require('path');
const { pathToFileURL } = require('url');

describe('end to end test: add new deck and verify on card-deck page', () => {
  let browser;
  let page;
  const testDeckName = 'TestDeck123';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security']
    });
    page = await browser.newPage();
    // Prevent external CSS/fonts from slowing or blocking us:
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test(
    'landingPage to card-deck to deck-form to add deck to see deck on card-deck',
    async () => {
      // load landingPage.html
      const landingPath = path.resolve(
        __dirname,
        '../src/frontend/landingPage.html'
      );
      const landingUrl = pathToFileURL(landingPath).href;
      await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

      // navigate to card-deck.html (simulate clicking “Decks”)
      const cardDeckPath = path.resolve(
        __dirname,
        '../src/frontend/card-deck.html'
      );
      const cardDeckUrl = pathToFileURL(cardDeckPath).href;
      await page.goto(cardDeckUrl, { waitUntil: 'domcontentloaded' });

      // click the “+” add-card link
      await page.waitForSelector('a.card.add-card', { timeout: 5000 });
      await Promise.all([
        page.click('a.card.add-card'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
      ]);

      // on deck-form.html, type into #deck-name
      await page.waitForSelector('#deck-name', { timeout: 5000 });
      await page.click('#deck-name');
      await page.type('#deck-name', testDeckName);

      // listen for the alert “deck added” and accept it
      page.once('dialog', async (dialog) => {
        await dialog.accept();
      });

      // click submit and wait for navigation back to card-deck.html
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
      ]);

      // on card-deck.html, wait until a .card-title matches test name
      await page.waitForFunction(
        (name) => {
          const titles = Array.from(document.querySelectorAll('.card-title'));
          return titles.some(el => el.textContent.trim() === name);
        },
        { timeout: 10000 },
        testDeckName
      );

      // assert that a card-title equals deck name
      const exists = await page.evaluate((name) => {
        return Array.from(document.querySelectorAll('.card-title'))
          .some(el => el.textContent.trim() === name);
      }, testDeckName);
      expect(exists).toBe(true);
    },
    30000 // 30s timeout
  );
});
