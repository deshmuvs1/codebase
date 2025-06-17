class OrdersummaryPage {



    constructor(page) {


        this.page = page;
        this.ordersummary = page.locator("div.col-text")
    }


    async summarytext(id) {
         return  await this.ordersummary.textContent();
        


    }

}
module.exports={OrdersummaryPage};