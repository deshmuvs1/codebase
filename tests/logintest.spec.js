const {test, expect} = require ('@playwright/test');

    test   ('login page test', async ({page}) => {



        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        console.log( await page.title());

        await page.locator('#username').fill('vaishnavi Deshmukh');

        await page.locator('[type="password"]').fill('siva'); 

        await page.locator('#signInBtn').click();

        console.log(await page.locator('[style*="block"]').textContent());

        await expect(page.locator('[style*="block"]')).toContainText('Incorrect');


        // store  locator into variable when locator are used mutliple time 

        const username= page.locator('#username');
        const password = page.locator('[type="password"]');
        const signin = page.locator('#signInBtn');
        const mobile = page.locator(".card-body a");
        
        await username.fill("");
        await password.fill('');

        await username.fill('rahulshettyacademy');
        await password.fill('learning');
        await signin.click();

        console.log (await mobile.first().textContent() );  // first element  //iphone
        console.log ( await mobile.nth(1).textContent()); // nth number of element //samsung 
        console.log (await (mobile.nth(2)).textContent());   //nokia 
        console.log (await mobile.last().textContent()); //  Last element is picked // blakberry
        await expect (mobile.nth(0)).toContainText('iphone'); // In assertion   , call complete locator in bracket then call assertion 
        await expect (mobile.nth(1)).toContainText('Samsung');
        await expect (mobile.nth(2)).toContainText('Nokia');
        await expect (mobile.nth(3)).toContainText('Blackberry');

      const companys=   await mobile.allTextContents();    // There is No Autowait for allTextContents Assertion , array will have zero  element if page is not loaded , it will not wait to load
      console.log(companys);
    
    } ); 