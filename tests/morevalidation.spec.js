import {test , expect } from "@playwright/test";


test.describe.configure({mode:'parallel'});

test ("pop validation", async ({page})=> {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();


   // hidden/ Visible

   await expect ( page.getByPlaceholder("Hide/Show Example")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect ( page.getByPlaceholder("Hide/Show Example")).toBeHidden();
   page.on('dialog', dialog=> dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator("#mousehover").hover();
   await page.locator("div.mouse-hover-content a").getByText('Reload').click();

   //Iframe

   const Framepage = page.frameLocator("#courses-iframe");
   await Framepage.locator("li a[href*='lifetime']:visible").click();
   const textcheck  = await Framepage.locator("div.text h2").textContent();

   console.log(textcheck.split(" ")[1]);

});


test ('screenshot & Visual comparison', async ({page})=>{


    

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   await expect ( page.getByPlaceholder("Hide/Show Example")).toBeVisible();
   await page.locator('#displayed-text').screenshot({path : 'partialScreenshot.png'});
   await page.locator("#hide-textbox").click();
   await page.screenshot({path: 'screenshot.png'});
       
});

//screenshot -store -> screenshot  ->

test ('visual', async ({page})=> {

    await page.goto("http://www.google.com/");
    expect (await page.screenshot()).toMatchSnapshot('landingpage.png');
})