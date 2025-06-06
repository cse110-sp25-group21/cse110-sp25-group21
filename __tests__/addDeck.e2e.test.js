/**
 * @jest-environment node
 *
 * run using: npm testlandingToDeckEditor.puppeteer.test.js
 *
 * this tests:
 *   1) Load landingPage.html
 *   2) Navigate to card-deck.html
 *   3) Navigate to deck-form.html
 *   4) Type “MyTestDeck” into #deck-name
 *   5) Stub getDecks() in advance
 *   6) Intercept and abort external script requests, then navigate to deck-editor.html?deck=MyTestDeck
 *   7) Wait until .deck-title text changes to “MyTestDeck”
 */

const puppeteer = require('puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');

describe('end to end test: landing to card-deck to deck-form to deck-editor', () => {
  let browser;
  let page;
  const testDeckName = 'MyTestDeck';


  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security']
    });
    page = await browser.newPage();
  });


  afterAll(async () => {
    await browser.close();
  });
  

  test(
    'landing to card-deck to deck-form to deck-editor',
    async () => {
      // load landingPage.html
      const landingPath = path.resolve(
        __dirname,
        '../src/frontend/landingPage.html'
      );
      const landingUrl = pathToFileURL(landingPath).href;
      await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

      // verify “Decks” link exists
      await page.waitForSelector('a[href*="card-deck.html"]', { timeout: 5000 });
      const decksLinkText = await page.$eval(
        'a[href*="card-deck.html"]',
        el => el.textContent.trim()
      );
      expect(decksLinkText).toBe('Decks');

      // navigate to card-deck.html
      const cardDeckPath = path.resolve(
        __dirname,
        '../src/frontend/card-deck.html'
      );
      const cardDeckUrl = pathToFileURL(cardDeckPath).href;
      await page.goto(cardDeckUrl, { waitUntil: 'domcontentloaded' });

      // wait for (add-card) link
      await page.waitForSelector('a.card.add-card', { timeout: 5000 });

      // navigate to deck-form.html
      const deckFormPath = path.resolve(
        __dirname,
        '../src/frontend/deck-form.html'
      );
      const deckFormUrl = pathToFileURL(deckFormPath).href;
      await page.goto(deckFormUrl, { waitUntil: 'domcontentloaded' });

      // type into #deck-name
      await page.waitForSelector('#deck-name', { timeout: 5000 });
      await page.click('#deck-name');
      await page.type('#deck-name', testDeckName);

      // stub getDecks/getDeckImage for any new document
      await page.evaluateOnNewDocument((name) => {
        window.getDecks = () => [{ id: name, name: name, cards: [] }];
        window.getDeckImage = () => '';
      }, testDeckName);

      // intercept and abort external scripts before navigating
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (req.resourceType() === 'script') {
          return req.abort();
        }
        req.continue();
      });

      // navigate to deck-editor.html?deck=MyTestDeck
      const deckEditorPath = path.resolve(
        __dirname,
        '../src/frontend/deck-editor.html'
      );
      const deckEditorBase = pathToFileURL(deckEditorPath).href;
      const deckEditorUrl = `${deckEditorBase}?deck=${encodeURIComponent(testDeckName)}`;
      await page.goto(deckEditorUrl, { waitUntil: 'domcontentloaded' });

      // wait until .deck-title text becomes “MyTestDeck”
      await page.waitForFunction(
        (name) => {
          const el = document.querySelector('.deck-title');
          return el && el.textContent.trim() === name;
        },
        { timeout: 10000 },
        testDeckName
      );

      // assert that it changed
      const displayedTitle = await page.$eval(
        '.deck-title',
        (el) => el.textContent.trim()
      );
      expect(displayedTitle).toBe(testDeckName);
    },
    45000 // 45s timeout to allow file loading
  );
});