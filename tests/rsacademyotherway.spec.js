const {test , expect} = require ('@playwright/test');


test ('loginpage', async ({page}) => {

    const shop = page.locator(".card-body");
    const coat  = "ZARA COAT 3"
    const email = 'vinnie@vinnie.com'

    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Vinnie@267');
    await page.getByRole('button',{name:'Login'}).click();
    await page.waitForLoadState('networkidle');  // network call come to idle state  //flaky 
    await  shop.nth(2).waitFor(); //runner waits till locator is loaded 
    await page.locator(".card-body").filter({hasText:coat}).getByRole("button",{name:"Add to Cart"}).click();
   
   //page 2 
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await expect (page.getByText(coat)).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ja");  //Select country
    await page.getByRole("button",{name:"Japan"}).click();

       
        const month =  page.locator(".input.ddl").first();
        const year =  page.locator(".input.ddl").last(); 
        const input=  page.locator(".field.small .input.txt");
        const cardname = page.locator("div.field [type='text']").nth(2);
        const applycoupon = page.locator(".btn-primary");
        const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        const orderpage = page.locator("button[routerlink*='myorders']");

        //checkout page 
        
        await month.click();                    //expiry date 
        await month.selectOption('12');  
        await year.click();
        await year.selectOption('26');
        await input.first().fill('267');    //CVV 
        await input.last().fill('rahulshettyacademy'); //Coupon code 
        await cardname.fill('vinnie deshmukh');  //cardname 
        await applycoupon.click();  // Apply coupon button
        await expect ( month).toHaveValue('12');
        await expect ( year).toHaveValue('26');
        await expect (input.first()).toHaveValue('267');
        await expect (input.last()).toHaveValue('rahulshettyacademy');
        await expect (cardname).toHaveValue('vinnie deshmukh');
        await expect( page.locator("[style*='green']")).toContainText('* Coupon Applied')
        await expect ( page.locator(".user__name [type='text']").first()).toHaveText(email);


        await page.getByText("Place Order").click();  //place order button  
        await page.locator(".hero-primary").waitFor();
        await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
         const id =   await orderId.textContent();
        console.log(id);


        //orderpage
         await orderpage.click();
        await page.locator("tbody").waitFor();
        

        const valueId=  page.locator("tbody tr");
        const valueidcount = await valueId.count();

         for (let i=0; i<valueidcount; ++i){

                 const number=  await valueId.nth(i).locator("th").textContent();
         if ( id.includes(number) ) {

            await valueId.nth(i).locator("button").first().click();   //ordersummary page 

            break;
         } }

         // order summary page 

        const ordersummary = await page.locator("div.col-text").textContent();
         expect(id.includes(ordersummary)).toBeTruthy();



  



});