/**
 * @jest-environment node
 *
 * run using: npm test addRestaurant.e2e.test.js
 *
 * this tests:
 *   - load landingPage.html
 *   - click “Add Restaurant” in the header
 *   - fill out every field on restaurant-form.html
 *   - select the first deck option
 *   - submit the form
 *   - verify redirection to card-deck.html
 */

const puppeteer        = require('puppeteer');
const { resolve }      = require('path');
const { pathToFileURL } = require('url');

const NAV_WAIT         = 'domcontentloaded';
const DEFAULT_TIMEOUT  = 20000;
const SELECT_TIMEOUT   =  5000;

describe('E2E: add-restaurant flow ends at card-deck.html', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-web-security']
    });
    page = await browser.newPage();

    // avoid loading external CSS/fonts
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (['stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }, DEFAULT_TIMEOUT);

  afterAll(async () => {
    await browser.close();
  });

  test(
    'loads restaurant-form, fills fields, submits, and lands on card-deck.html',
    async () => {
      // load the landing page
      const landingPath = resolve(__dirname, '../src/frontend/landingPage.html');
      const landingUrl  = pathToFileURL(landingPath).href;
      await page.goto(landingUrl, { waitUntil: NAV_WAIT, timeout: DEFAULT_TIMEOUT });

      // click "Add Restaurant" in the header
      const addLinkSel = 'a[href*="restaurant-form.html"]';
      await page.waitForSelector(addLinkSel, { timeout: SELECT_TIMEOUT });
      await Promise.all([
        page.click(addLinkSel),
        page.waitForNavigation({ waitUntil: NAV_WAIT, timeout: DEFAULT_TIMEOUT })
      ]);

      // fill out the form fields
      await page.waitForSelector('#restaurant-name', { timeout: SELECT_TIMEOUT });
      await page.type('#restaurant-name', 'Test Cafe');
      await page.type('#food-genre', 'Cafe');
      // select the first deck option
      await page.select('#deck-id', await page.$eval('#deck-id option', o => o.value));
      await page.type('#menu', 'Latte, Espresso, Sandwiches');
      await page.type('#business-hour', '8 AM - 6 PM');
      await page.type('#address', '123 Test St');
      await page.type('#website', 'https://testcafe.example.com');
      await page.type('#phone', '(555) 123-4567');

      // submit the form and wait for redirect
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: NAV_WAIT, timeout: DEFAULT_TIMEOUT })
      ]);

      // verify we landed on card-deck.html
      const finalUrl = page.url();
      expect(finalUrl.endsWith('card-deck.html')).toBe(true);
    },
    DEFAULT_TIMEOUT
  );
});
