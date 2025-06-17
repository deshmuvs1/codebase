import {test ,expect, request} from "@playwright/test"

import { APIUtils } from "../utils/APIUtils"

const loginpayload =  {userEmail:"vinnie@vinnie.com",userPassword:"Vinnie@267"}

const orderpayload = {orders:[{country:"Japan",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]}
 
let response;







test.beforeAll(async  ()=>{

 const   APIcontext =  await request.newContext()
const apiUtils = new APIUtils(APIcontext, loginpayload);
response  =  await apiUtils.createOrder(orderpayload); 



});




    
  //Placing Order

test ("Testrun", async ({page })=> {


    await page.addInitScript( value =>
    {
        window.localStorage.setItem('token', value );
    }, response.token);


    

    await page.goto("https://rahulshettyacademy.com/client")
    const orderpage = page.locator("button[routerlink*='myorders']");

    await orderpage.click();
    await page.locator("tbody").waitFor();
    
    

    const valueId=  page.locator("tbody tr");
    const valueidcount = await valueId.count();
    
    

     for (let i=0; i<valueidcount; ++i){

             const number=  await valueId.nth(i).locator("th").textContent();
     if ( response.orderId.includes(number) ) {

        await valueId.nth(i).locator("button").first().click();   //ordersummary page 

        break;
     } }

     // order summary page 

    const ordersummary = await page.locator("div.col-text").textContent();
     expect(response.orderId.includes(ordersummary)).toBeTruthy();


});



  


    