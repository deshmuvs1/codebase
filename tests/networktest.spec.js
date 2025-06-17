import {test ,expect, request} from "@playwright/test"

import { APIUtils } from "../utils/APIUtils"

const loginpayload =  {userEmail:"vinnie@vinnie.com",userPassword:"Vinnie@267"}

const orderpayload = {orders:[{country:"Japan",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]}

const fakepayloadorders = {data: [], message: "No Orders"}
 
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


    

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/68137452fc76541aad49a9d0",
        
    async route=> 
        { const response = await  page.request.fetch(route.request());
            let body = JSON.stringify(fakepayloadorders);
            route.fulfill({


                response,
                body,
            });

});
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    const orderpage = page.locator("button[routerlink*='myorders']");
    await orderpage.click();
   await  page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    
    
});