
class OrderhistoryPage {

    constructor (page){



            this.orderpage = page.locator("button[routerlink*='myorders']");
            this.valueId =   page.locator("tbody tr");
            this.orderTable= page.locator("tbody");
        

    }


    async orderhistoryselect (orderId) {
        await this.orderpage.click();
            await this.orderTable.waitFor();
            console.log (orderId)
           
            const valueidcount = await this.valueId.count();

            for (let i=0; i<valueidcount; ++i){

                    const number=  await this.valueId.nth(i).locator("th").textContent();
            if ( orderId.includes(number) ) {

                await this.valueId.nth(i).locator("button").first().click();   //ordersummary page 

                break;
            } }
             
        }}
        module.exports={OrderhistoryPage};