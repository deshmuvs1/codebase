const { test, expect } = require('@playwright/test');


test('browser context  playwright test', async ({ browser }) => {

  //playwirght code 

  //chrome - plugins /cookies 

  const context = await browser.newContext();
  const page = await context.newPage();
  page.route('**/*.{jpg,png,jpeg}',route => route.abort());
  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const cardTitless =page.locator(".card-bofy a");
  await page.on('request',request=> console.log(request.url()));
  await page.on('response',response => console.log(response.url()));
  
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());


  await username.fill("rahulshettyacademy")
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
}
); // structure of test 




// In playwright there fixture so no need to give context , browser directly we can go to page open step 


test('page playwright test', async ({ page }) => {

  await page.goto("https://google.com");  // only keyword will execute particular testcase 

  console.log(await page.title());


  await expect(page).toHaveTitle('Google');
});
