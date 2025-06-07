/**
 * @jest-environment node
 *
 * __tests__/landingToDeck.puppeteer.test.js
 *
 * this tests:
 *   1) Load landingPage.html
 *   2) Navigate to card-deck.html
 *   3) Click the “Edit” button and verify it toggles to “Done” then back to “Edit”
 */

const puppeteer = require('puppeteer');
const path = require('path');

describe('end to end test: landingPage to card-deck edit/done toggle', () => {
  let browser;
  let page;

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

  test('landingPage.html → click decks in header → card-deck.html → Edit/Done button toggles',
    async () => {
      // RLs for both pages
      const landingPath = path.resolve(
        __dirname,
        '../src/frontend/landingPage.html'
      );
      const landingUrl = 'file://' + landingPath;

      const cardDeckPath = path.resolve(
        __dirname,
        '../src/frontend/card-deck.html'
      );
      const cardDeckUrl = 'file://' + cardDeckPath;

      // 1) Load landingPage.html
      await page.goto(landingUrl, { waitUntil: 'domcontentloaded' });

      // verify that “Decks” link exists on landing page
      // landingPage.html has:
      // <a href="../frontend/card-deck.html">Decks</a>
      // confirm the links text is there:
      const decksLinkText = await page.$eval(
        'a[href*="card-deck.html"]',
        (el) => el.textContent.trim()
      );
      expect(decksLinkText).toBe('Decks');

      // navigate to card-deck.html
      await page.goto(cardDeckUrl, { waitUntil: 'domcontentloaded' });

      // confirm its in card-deck.html
      expect(page.url().endsWith('card-deck.html')).toBe(true);

      // wait for edit button to appear
      await page.waitForSelector('.edit-button');

      // verify initial text is Edit
      let buttonText = await page.$eval('.edit-button', (el) => el.textContent.trim());
      expect(buttonText).toBe('Edit');

      // click Edit and wait until its text becomes Done
      await page.click('.edit-button');
      await page.waitForFunction(() => {
        const btn = document.querySelector('.edit-button');
        return btn && btn.textContent.trim() === 'Done';
      });

      buttonText = await page.$eval(
        '.edit-button',
        (el) => el.textContent.trim()
      );
      expect(buttonText).toBe('Done');

      // click Done again → wait until text is Edit
      await page.click('.edit-button');
      await page.waitForFunction(() => {
        const btn = document.querySelector('.edit-button');
        return btn && btn.textContent.trim() === 'Edit';
      });

      buttonText = await page.$eval(
        '.edit-button',
        (el) => el.textContent.trim()
      );
      expect(buttonText).toBe('Edit');
    },
    20000 // 20s timeout
  );
});