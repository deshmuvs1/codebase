const { When, Then, Given } = require('@cucumber/cucumber');
const { pomanager } = require('../../pageobjects/POManager');
const { expect} = require('@playwright/test');
const playwright = require ('@playwright/test');



Given('a loging to Ecommerce applcation with {string} and {string}',{timeout: 100*1000} ,async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

   
    //js file - Login js , DashboardPage
    const loginPage =this.pomanager.getLoginPage(); //loginPage constructor
    await loginPage.goto();
    await loginPage.validLogin(username,password);
    this.username=username;



});


When('Add {string} to cart',{timeout: 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.pomanager.getDashboardPage();// dashboardPage
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigatetoCart();
});

Then('Verify {string} is displayed in the cart',{timeout: 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const checkoutPage = this.pomanager.getCheckoutPage();  //CheckoutPage
    await checkoutPage.cartproduct(productName);
    await checkoutPage.checkout();

});

When('Enter Valid details and Place the Order',{timeout: 100*1000}, async function () {
    // Write code here that turns the phrase above into concrete actions

    const orderreviewpage = this.pomanager.getOrderreviewPage();  //OrderReviewPage
    await orderreviewpage.addcountry();
    await orderreviewpage.checkoutdetailspage(this.username);
    await orderreviewpage.verifyEmailId(this.username);
    const orderId = await orderreviewpage.placeOrderandGetOrdeId()
    this.orderId= orderId


});

Then('Verify order in present in the OrderHistory',{timeout: 100*1000} ,async function () {
    // Write code here that turns the phrase above into concrete actions


    const orderhistoryPage = this.pomanager.getOrderhistoryPage();  //OrderHistoryPage
    await orderhistoryPage.orderhistoryselect(this.orderId);

    const ordersummaryPage = this.pomanager.getOrdersummaryPage();  //OrderSummaryPage
    expect(this.orderId.includes(await ordersummaryPage.summarytext())).toBeTruthy();
   

});


  Given('a login to Ecommerce2 application with {string} and {string}', async function (string, string2) {
           // Write code here that turns the phrase above into concrete actions

                await this.page.goto("https://rahulshettyacademy.com/loginpagePractise")
           
         });

  

         Then('Verify Error message is displayed', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

