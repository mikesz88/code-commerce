const fakeUser = {
    email: 'fake@devslopes.com',
    password: 'Devslopes0!',
    cart: undefined,
    shipping: undefined,
    payment: undefined
}

const commerceComponents = {
    storeDisplay : {
        display: true,
        items: {
            HTMLandCSSOnly: 99.99,
            SaaS: 149.99,
            Responsive: 199.99,
            JavaScript: 249.99,
            Portfolio: 299.99,
            React: 349.99,
            Angular: 399.99,
            CustomOrder: 499.99,
        }
    },
    login: {
        display: false,
    },
    cart: {
        display: false
    },
    shipping: {
        display: false
    },
    payment: {
        display: false
    }
};

export const stateComponents = {
    users: {
        fakeUser
    },
    commerceComponents,
}