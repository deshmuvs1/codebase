Feature: Ecommerce validations
@foo
@Regression

Scenario: Placing the Order

Given a loging to Ecommerce applcation with "vinnie@vinnie.com" and "Vinnie@267"
When Add "ZARA COAT 3" to cart     
Then Verify "ZARA COAT 3" is displayed in the cart 
When Enter Valid details and Place the Order 
Then Verify order in present in the OrderHistory

