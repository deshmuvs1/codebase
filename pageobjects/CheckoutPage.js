
class CheckoutPage {


    constructor(page) {

        this.page = page;
        this.checkoutpg = page.locator("div li").first();
        this.producttext = page.locator(".card-body b");
        this.checkoutbutton = page.locator("text=Checkout");
    }

    async cartproduct(productName) {


        await this.checkoutpg.waitFor();
        const boolena = await this.getProductLocator(productName).isVisible();
        
    }


    async checkout() {

        await this.checkoutbutton.click();
    }

    getProductLocator(productName) {
        
        return this.page.locator("h3:has-text('"+productName+"')");
    }

}


module.exports = { CheckoutPage };