const {expect} = require('@playwright/test');
class OrderreviewPage {

    constructor(page) {

        this.page = page;
        this.month = page.locator(".input.ddl").first();
        this.year = page.locator(".input.ddl").last();
        this.input = page.locator(".field.small .input.txt");
        this.cardname = page.locator("div.field [type='text']").nth(2);
        this.applycoupon = page.locator(".btn-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderpage = page.locator("button[routerlink*='myorders']");
        this.countrytextbox = page.locator("[placeholder*= 'Country']");
        this.dropdown = page.locator("section.ta-results");
        this.placeOrderbutton = page.locator(".action__submit ");
        this.thankyouforodertext = page.locator(".hero-primary");
        this.emailId = page.locator(".user__name [type='text']").first();
    }

    async addcountry() {

        await this.countrytextbox.pressSequentially("ja");  //Select country
        await this.dropdown.waitFor();

        const Option = await this.dropdown.locator("button").count();
        for (let i = 0; i < Option; ++i) {

            let text = await this.dropdown.locator("button").nth(i).textContent();

            if (text === " Japan") {
                this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async checkoutdetailspage() {
        //checkout page 

        await this.month.click();                    //expiry date 
        await this.month.selectOption('12');
        await this.year.click();
        await this.year.selectOption('26');
        await this.input.first().fill('267');    //CVV 
        await this.input.last().fill('rahulshettyacademy'); //Coupon code 
        await this.cardname.fill('vinnie deshmukh');  //cardname 
        await this.applycoupon.click();  // Apply coupon button
       

    }
    async verifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }
    

    async placeOrderandGetOrdeId() {
        await this.placeOrderbutton.click();  //place order button  
        await this.thankyouforodertext.waitFor();
        await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
        return await this.orderId.textContent();
           }
      

}
module.exports = { OrderreviewPage };