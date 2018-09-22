const puppeteer = require('puppeteer');

const getAttr = async function(par: any, attr: string, page: any) {
  const handle: any = await page.evaluateHandle(
    (el, attr) => el.getAttribute(attr),
    par,
    attr
  );
  return await handle.jsonValue();
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');
  // await page.screenshot({ path: 'example.png' });
  const elements = await page.$$('[data-tip]');
  const promises = elements.forEach((element: any, idx: number) => {
    const attr = getAttr(element, 'data-tip', page);
    element.screenshot({ path: `temp/${idx}.png` });
  });

  await Promise.all(promises);

  await browser.close();
})();
