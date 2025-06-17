const {LoginPage }= require ('./LoginPage');
const {DashboardPage }= require ('./DashboardPage');
const {OrderhistoryPage }= require ('./OrderhistoryPage');
const {OrdersummaryPage }= require ('./OrdersummaryPage');
const {OrderreviewPage}= require('./OrderreviewPage');
const {CheckoutPage} = require('./CheckoutPage');

class POManager {

    constructor (page){
        this.page = page ;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.orderhistoryPage = new OrderhistoryPage(this.page);
        this.ordersummaryPage = new OrdersummaryPage(this.page);
        this.orderreviewpage = new OrderreviewPage(this.page);
        this.checkoutpage = new CheckoutPage(this.page);

    }

    getLoginPage(){
        return this.loginPage;

    }

    getCheckoutPage(){
        return this.checkoutpage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getOrderhistoryPage(){
        return this.orderhistoryPage;
    }

    getOrdersummaryPage(){
        return this.ordersummaryPage;

    }
    getOrderreviewPage(){
        return this.orderreviewpage;
    }

}
module.exports={POManager};