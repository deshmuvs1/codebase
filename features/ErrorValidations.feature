Feature: Ecommerce validations

@validation


Scenario Outline: Placing the Order

Given a login to Ecommerce2 application with "vinnie@vinnie.com" and "Vinnie@267"

Then Verify Error message is displayed


Examples:
    | username                | password   | 
    | vinnie@vinnie.com       | Vinnie@267 |
    |Vaishnavi@deshmukh.com   | Siva@267 |
