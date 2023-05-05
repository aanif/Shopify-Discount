# Prerequesits for seting up the project

Few things need we need to make sure first in order to get the project setup is: 
* You have composer installed.
    * to check if it’s installed run `composer -v`
    * if it’s not installed, follow the following instructions https://getcomposer.org/doc/00-intro.md
* You have php8.0 installed 
    * to check if it’s installed run `php -v` 
    * if it’s not installed, follow the following instructions https://www.geeksforgeeks.org/how-to-install-php-on-macos/

# Setting up the project

* After that, clone the project using following command
`git clone git@github.com:aanif/Shopify-Discount.git`

(before cloning make sure that you have been invited to the repo) 
* run `cd Shopify-Discount/web` and then run `composer install`
* next step is to setup the `.env` file for that run `cp .env.example .env` 

# Shopify Developer Take Home Test | Backend/Fullstack

Your task for this project is to create a Shopify App that can enable and disable a single automatic discount in the store.

You will be provided a starter app repository for this task.

You will need to utilise the Laravel 8 Framework for this task.

We will not be testing oAuth during this exercise. For this reason, the app template we provide you will be accompanied by a Shopify access token, key and secret.

The functionality your custom app should enable for the store admins is as follows:

* Enable the admin of the store to enable or disable a discount called “Buy a loyalty card and get a free gift!” 
* This discount should have the following settings (configurable by admin)
    * End date - if an order is placed after this date, the discount should NOT be applied.
    * Eligible Products - This should be a product selector, allowing the store admins to select the products that triggers this discount. Multiple products may be selected.
    * Gift product - This should be a product selector, allowing the store admins to select the product that will be given as a free gift.
* The discount must be created using Shopify’s API

To achieve this:

* Download the template from the provided Bitbucket repo
* Create a new page in the admin (via React and App Bridge) to allow setting of the discount when loaded. This page should:
* If no discount has been created, show an empty state
* If a discount has been added, load the details of the discount and allow editing
* Allow saving of the discount state
* Allow for removal of the discount
* Create the routes in Laravel
* These should handle all CRUD operations for the discount




You should ensure

* PHP PSR Standards are being met (this includes DocBlock, indentation, etc)
* Errors are handled correctly (a response and HTTP code must be given)
* Follow best security practices (validation, data handling, etc)
* The code runs fast and efficiently



## Submitting your work
Please ZIP your work (the complete repo) and email it back to use.


**Useful info:**

* We use the https://github.com/Shopify/shopify-app-template-php template for this test  
Any issues connecting to Shopify, please consult this guide
