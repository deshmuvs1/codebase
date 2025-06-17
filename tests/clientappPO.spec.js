import {test, expect} from '@playwright/test';
import {POManager} from '../pageobjects/POManager'; 
import { customtest } from '../utils/test-base';

//JSON --> String --> js Object 
const dataset =  JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


//terates over each test data object in the dataset array.
//Why: Enables data-driven testing by running the same test logic with different input values (e.g., different users or products).
// How: Each data object contains values like username, password, and productName for a single test scenario.
for (const data of dataset){
 
    //Two different DataSet ${data.productname}

//Purpose: Defines a Playwright test for each data set.
//Why: The test name dynamically includes the product name, making it easy to identify which scenario is being executed.
//How: Uses Playwright’s test function and the Page Object Model (POM) to structure and run the test steps for each data set independently.


test (`Client App PO for "${data.productName }` , async ({page})=>
{
    const pomanager = new POManager(page);
   
    const loginPage = pomanager.getLoginPage(); //loginPage constructor
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage =  pomanager.getDashboardPage();// dashboardPage
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigatetoCart();

    const checkoutPage = pomanager.getCheckoutPage();  //CheckoutPage
    await checkoutPage.cartproduct(data.productName);
    await checkoutPage.checkout();

    const orderreviewpage =pomanager.getOrderreviewPage();  //OrderReviewPage
    await orderreviewpage.addcountry();
    await orderreviewpage.checkoutdetailspage(data.username);
    await orderreviewpage.verifyEmailId(data.username);
    const orderId =  await orderreviewpage.placeOrderandGetOrdeId();

    const orderhistoryPage =pomanager.getOrderhistoryPage();  //OrderHistoryPage
    await orderhistoryPage.orderhistoryselect(orderId);

    const ordersummaryPage = pomanager.getOrdersummaryPage();  //OrderSummaryPage
    expect(orderId.includes(await ordersummaryPage.summarytext())).toBeTruthy();



})};
// @Web is tag given to run specific test cases with command npx playwright test --grep=@Web 
//Datafixture by Extent Test annotation 
customtest("@Web ClientAPPTest - DataFixture", async ({page,testDataForOrder})=>
{
    const pomanager = new POManager(page);
   
    const loginPage = pomanager.getLoginPage(); //loginPage constructor
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage =  pomanager.getDashboardPage();// dashboardPage
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigatetoCart();
    const checkoutPage = pomanager.getCheckoutPage();  //CheckoutPage
    await checkoutPage.cartproduct(testDataForOrder.productName);
    await checkoutPage.checkout();
    const orderreviewpage =pomanager.getOrderreviewPage();  //OrderReviewPage
    await orderreviewpage.addcountry();
    await orderreviewpage.checkoutdetailspage(testDataForOrder.username);
    await orderreviewpage.verifyEmailId(testDataForOrder.username);
    const orderId =  await orderreviewpage.placeOrderandGetOrdeId();
    const orderhistoryPage =pomanager.getOrderhistoryPage();  //OrderHistoryPage
    await orderhistoryPage.orderhistoryselect(orderId);
    const ordersummaryPage = pomanager.getOrdersummaryPage();  //OrderSummaryPage
    
    expect(orderId.includes(await ordersummaryPage.summarytext())).toBeTruthy();



});