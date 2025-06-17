const {test , expect} = require ('@playwright/test');


test ('loginpage', async ({page}) => {

    const shop = page.locator(".card-body");
    const coat  = "ZARA COAT 3"
    const email = 'vinnie@vinnie.com'

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Vinnie@267');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');  // network call come to idle state  //flaky 
    await  shop.nth(2).waitFor(); //runner waits till locator is loaded 
   
    const count=  await shop.count();  // count of locator matching number of element 
    for (let i=0 ;  i< count ; ++i  )   
            {
              if  ( await shop.nth(i).locator("b").textContent () === coat) 
    {           shop.nth(i).locator("text = Add To Cart").click();                 // if condition of text satisfy then click on text 
              break;           
}}
    

 
//product title print 
    await expect(shop.nth(0)).toContainText('ZARA');
    await expect(shop.nth(1)).toContainText('ADIDAS');
    
    const print = await shop.nth(0).textContent();
    const print1 = await shop.nth(2).textContent();
    const alltext = await shop.allTextContents();

    await page.locator("[routerlink*='cart']").click(); // Open cart page 
    await page.locator("div li").first().waitFor();
    const boolena =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect (boolena).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*= 'Country']").pressSequentially("ja");  //Select country
    const dropdown =  page.locator("section.ta-results")
    await dropdown.waitFor();

    const Option =  await dropdown.locator("button").count();
    for (let i= 0; i< Option; ++i) {

      let  text = await dropdown.locator("button").nth(i).textContent();
     
        if( text ===" Japan"){
        dropdown.locator("button").nth(i).click();
        break;
        }}

       
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
        await page.locator (".action__submit").click();  //place order button  
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



  

    console.log(print);
    console.log(print1);
    console.log(alltext);
    


});