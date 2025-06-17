import { test, expect, context } from "@playwright/test"



test('security test request intercept', async ({ page }) => {


    // login and reach orders page 


    const shop = page.locator(".card-body");
    const coat = "ZARA COAT 3"
    const email = 'vinnie@vinnie.com'

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Vinnie@267');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');  // network call come to idle state  //flaky 
    await shop.nth(2).waitFor();
    const orderpage = page.locator("button[routerlink*='myorders']");
    await orderpage.click();



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" }) )
    await page.locator("button:has-text('view')").first().click();
    await expect (page.locator("p").last()).toHaveText("You are not authorize to view this order")});

    