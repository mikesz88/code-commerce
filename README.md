# [Project 10 - Code Commerce](https://mikesz88.github.io/code-commerce/)

You are going to build an e-commerce store for code. A super-smart person decided it was time for developers to actually make money with code instead of posting it for free online. Introducing Code Commerce -- a store where developers can sell pre-built code projects and snippets.

This project focuses on a few major principles:

    - Forms and form validation with React
    - Building stateful components
    - Passing data between components

Overview

You will build a 5-part checkout form. 

    1. Signup/Login
    2. Customer cart
    3. Shipping information
    4. Payment information
    5. Confirmation

Note: Please do NOT use React Routing in this project. You will learn this later and the goal is to master components, props, and state and conditional UI rendering.

## Tech Used:
![HTML5](https://camo.githubusercontent.com/d63d473e728e20a286d22bb2226a7bf45a2b9ac6c72c59c0e61e9730bfe4168c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465) ![CSS](https://camo.githubusercontent.com/3a0f693cfa032ea4404e8e02d485599bd0d192282b921026e89d271aaa3d7565/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465) ![JavaScript](https://camo.githubusercontent.com/93c855ae825c1757f3426f05a05f4949d3b786c5b22d0edb53143a9e8f8499f6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d463744463145) ![React](https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)

## Requirements: 

***Signup/Login***

## Requirements

    1. User can sign-in
    2. Password field is obscured
    3. There is an "eye" icon next to password to reveal what is being typed
    4. If password is invalid, show an error message as depicted in the screenshot below
    5. If successful sign-in, take user to Customer Cart
    6. User can switch between Sign in and Create Account
    7. If creating an account there will be two password fields
    8. Passwords must match or show appropriate error as depicted below
    9. First name and last name cannot have numbers
    10. Postal code must not allow text (numbers only)
    11. Show an "eye" icon next to password to reveal what is being typed
    12. If an account for that email already exists, show an error message
    13. Add a facebook sign in button (non-functional).

***Customer Cart***

## Requirements

    1. Create a cart that has 2-5 items in it
    2. These should be actual components with item value
    3. The total sum of all items should be calculated as a total
    4. Items can be removed and quantities can be increased or decreased -- cart total should adjust accordingly
    5. If there are zero cart items the Checkout button should be disabled
    6. If Checkout is selected move to the shipping screen

***Shipping Information***

## Requirements

    1. Show all shipping fields as depicted in the screenshot below
    2. Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
    3. Ensure phone fields cannot take text (only numbers)
    4. Ensure postal code cannot take text (only numbers)
    5. Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
    6. Back to cart button should go back to cart
    7. There should be a Next or "Payment" button to go to next screen

***Payment Information***

## Requirements

    1. Create a credit card formatted that takes all major credit cards (Visa, Master Card, American Express, etc
    2. Format the credit card field so the numbers are properly spaced (we don't want it to look ugly!)
    3. Have a dropdown for month and year for expiration dates
    4. Show errors if fields are entered incorrectly
    5. The Pay button should show the total price. If the fields are not complete this button should be disabled
    6. Make sure to show the cart/total at the right (or somewhere else)
    7. The Pay button should take the user to the confirmation screen

***Confirmation Screen***

## Requirements

    1. Should show amount paid
    2. Should show last 4 digits of credit card used to make the purchase
    3. Add other UI as depicted below

***APP MOCKUPS***
Unable to show due to propriety. 

<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
