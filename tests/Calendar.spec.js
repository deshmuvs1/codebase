import {test , expect} from '@playwright/test';


test('calendar', async ({page,context })=> {


    const date = "26";
    const month = "12";
    const year = "2027"; 

    

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#");

const [Newpage] = await Promise.all ([context.waitForEvent('page'),page.getByText("Top Deals").click() ]);

await  Newpage.locator(".react-date-picker__inputGroup").click();
await  Newpage.locator(".react-calendar__navigation__label__labelText").click();
await  Newpage.locator(".react-calendar__navigation__label").click();
await  Newpage.getByText(year).click();
await  Newpage.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();
await page.waitForLoadState('networkidle');
await  Newpage.locator("//abbr[text()='"+date+"']").click();

//Assetions

const inputs =  Newpage.locator(".react-date-picker--closed input");

for (let index=0; index<inputs.count;  index++){
     
    const value = inputs.getAttribute("value");
     expect (value).toEqual(expectedList[index]);

}


});
