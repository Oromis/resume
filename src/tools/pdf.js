const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://david.bauske.org/en', { waitUntil: 'networkidle0' });
    await page.pdf({ path: 'pdf/en.pdf', format: 'A4' });

    await browser.close();
})();
