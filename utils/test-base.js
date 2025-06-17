const base  =require ('@playwright/test');


exports.customtest = base.test.extend({
    testDataForOrder : {
        username : "vinnie@vinnie.com",
        password : "Vinnie@267",
        productName : "ZARA COAT 3"
    }
});
