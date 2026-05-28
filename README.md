# Incubyte QA Assessment: Gmail Compose Feature

This repository contains the test cases for the Gmail compose functionality, specifically testing the sending of an email with the subject "Incubyte" and the body " QA test for Incubyte".

## 1. Traditional Style Test Cases

| Test Case ID | Test Scenario | Pre-conditions | Steps to Execute | Expected Result | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_01** | Verify successful email delivery with valid inputs | User is logged into Gmail | 1. Click on the "Compose" button.<br>2. Enter a valid email address in the "To" field.<br>3. Enter **"Incubyte"** in the "Subject" field.<br>4. Enter **" QA test for Incubyte"** in the body.<br>5. Click the "Send" button. | A "Message sent" confirmation toast appears. The email is visible in the "Sent" folder with the exact subject and body. | Positive |
| **TC_02** | Verify sending an email with an empty "To" field | User is logged into Gmail | 1. Click on the "Compose" button.<br>2. Leave the "To" field blank.<br>3. Enter **"Incubyte"** in the "Subject" field.<br>4. Enter **" QA test for Incubyte"** in the body.<br>5. Click the "Send" button. | An error message is displayed stating "Please specify at least one recipient." The email is not sent. | Negative |
| **TC_03** | Verify sending an email with an invalid email address format | User is logged into Gmail | 1. Click on the "Compose" button.<br>2. Enter an invalid email format (e.g., `invalidemail.com`) in the "To" field.<br>3. Enter **"Incubyte"** in the Subject field.<br>4. Enter **" QA test for Incubyte"** in the body.<br>5. Click the "Send" button. | An error message is displayed indicating the email address is invalid or not recognized. The email is not sent. | Negative |

---

## 2. BDD-Style Test Cases (Gherkin Syntax)

### Feature: Gmail Compose and Send Email
**As a** registered Gmail user  
**I want** to compose and send an email  
**So that** I can communicate with a recipient regarding the Incubyte QA test  

#### Scenario 1: Successfully sending the Incubyte assessment email (Positive)
* **Given** the user is logged into their Gmail account
* **And** the user has clicked the "Compose" button
* **When** the user enters a valid email address in the "To" field
* **And** the user enters "Incubyte" in the "Subject" field
* **And** the user enters " QA test for Incubyte" in the email body
* **And** the user clicks the "Send" button
* **Then** a "Message sent" confirmation should be displayed
* **And** the email should be present in the user's "Sent" folder with the matching subject and body

#### Scenario 2: Attempting to send the email without a recipient (Negative)
* **Given** the user is logged into their Gmail account
* **And** the user has clicked the "Compose" button
* **When** the user leaves the "To" field blank
* **And** the user enters "Incubyte" in the "Subject" field
* **And** the user enters " QA test for Incubyte" in the email body
* **And** the user clicks the "Send" button
* **Then** an error message should be displayed prompting the user to specify at least one recipient
* **And** the email should remain unsent in the compose window

#### Scenario 3: Attempting to send the email with an invalid recipient format (Negative)
* **Given** the user is logged into their Gmail account
* **And** the user has clicked the "Compose" button
* **When** the user enters an improperly formatted email address (e.g., "testuser@.com") in the "To" field
* **And** the user enters "Incubyte" in the "Subject" field
* **And** the user enters " QA test for Incubyte" in the email body
* **And** the user clicks the "Send" button
* **Then** an error message should be displayed indicating that the email address is invalid
* **And** the email should remain unsent in the compose window
