const {test , expect } = require('@playwright/test');


test ('UI handling', async ({page}) => { 

    const dropdown = page.locator('select.form-control');


    await page.goto('https://rahulshettyacademy.com/loginpagePractise');

    await dropdown.selectOption('consult');     //dropdown
    await page.locator(".radiotextsty").last().click();  //radiobutton
    await  page.locator("#okayBtn").click();                      
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();                    //checkin Box
    await page.locator("#terms").uncheck();
     expect (  await page.locator("#terms").isChecked()).toBeFalsy(); //assertion 
   await expect (page.locator(".blinkingText")).toHaveAttribute("class","blinkingText");
  //await page.pause();

} );
//20. Handling Child windows & Tabs with Playwright by switching browser context


test (' Handling Child windows & Tabs with Playwright by switching browser context', async ({browser})=> {   

const context = await browser.newContext();
const page = await context.newPage();
await page.goto( 'https://rahulshettyacademy.com/loginpagePractise');
const documenturl = page.locator(".blinkingText");


//promise all is used to run step to parallel (asyncronously)  and it promise till it is fulfilled till that it will not perform further operation 

 const [newPage] = await Promise.all([context.waitForEvent('page'),    //listen for any new page to open (pending , rejected , fulfilled) 
        documenturl.click(),
  ]) // new page is Opened
  
    const  text= await  newPage.locator(".red").textContent();
    const arraytext = text.split("@")  // split into two array based 
    const domain =  arraytext[1].split(" ")[0]    // split based on space and zero index array is printed      
    await page.locator("#username").fill(domain);
    await expect(page.locator("#username")).toHaveValue(domain); //assertion
    const username= await page.locator("#username").inputValue();  //check the input value given 
    console.log(username);
  
    //console.log(domain);








});

