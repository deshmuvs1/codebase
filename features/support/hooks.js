const { BeforeStep, AfterStep, Status, Before, After } = require("@cucumber/cucumber");
const {POManager} = require ('../../pageobjects/POManager');
const playwright = require ('@playwright/test');


Before ({tags :"@foo"},async function(){

      const browser = await playwright.chromium.launch({
        headless : false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pomanager = new POManager(this.page);

  
});

BeforeStep(function(){});


AfterStep(async function ({result}){
    if (result.status === Status.FAILED){
    await this.page.screenshot({path:'screenshot1.png'});
}});

After (function(){
    console.log("Siva");
});