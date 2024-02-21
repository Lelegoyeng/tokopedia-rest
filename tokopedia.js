const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const tokopedia = async (search) => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 } });
    const page = await browser.newPage();
    await page.goto('https://tokopedia.com');
    await page.waitForSelector('input[type="search"]');
    await page.focus('input[type="search"]');
    console.log('Writing Search...');
    await page.keyboard.type(`${search}`, { delay: 50 });
    await page.keyboard.press('Enter');

    await page.waitForSelector('.prd_link-product-price');
    const content = await page.content();
    const $ = cheerio.load(content);
    const produk = [];
    $('.prd_link-product-name').each((index, element) => {
        const result = $(element).text().trim();
        produk.push(result);
    });
    const harga = [];
    $('.prd_link-product-price').each((index, element) => {
        const result = $(element).text().trim();
        harga.push(result);
    });
    const link = [];
    $('.css-19oqosi').each((index, element) => {
        const anchorHref = $(element).find('a').attr('href');
        if (anchorHref) {
            link.push(anchorHref);
        }
    });

    const result = produk?.map((get, i) => {
        return {
            produk: {
                nama: get,
                harga: harga[i],
                link: link[i]
            }
        }
    });

    await browser.close();
    return result

}

module.exports = { tokopedia }
