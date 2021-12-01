import HTMLandCSSImg from './assets/chris-ried-ieic5Tq8YMk-unsplash.jpg';
import SaaSImg from './assets/fahrul-razi-BR6lrzCPYPk-unsplash.jpg';
import ResponsiveImg from './assets/gabriel-heinzer-g5jpH62pwes-unsplash.jpg';
import JavaScriptImg from './assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg';
import PortfolioImg from './assets/joan-gamell-ZS67i1HLllo-unsplash.jpg';
import ReactImg from './assets/markus-spiske-cvBBO4PzWPg-unsplash.jpg';
import AngularImg from './assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg';
import CustomOrderImg from './assets/pankaj-patel-_SgRNwAVNKw-unsplash.jpg';


const fakeUser = {
    email: 'fake@devslopes.com',
    password: 'Devslopes0!',
    cart: undefined,
    shipping: undefined,
    payment: undefined
}

const commerceComponents = {
    storeDisplay : {
        display: false,
        items: {
            HTMLandCSSOnly: {
                price: 99.99,
                img: HTMLandCSSImg
            },
            SaaS: {
                price: 149.99,
                img: SaaSImg
            },
            Responsive: {
                price: 199.99,
                img: ResponsiveImg
            },
            JavaScript: {
                price: 249.99,
                img: JavaScriptImg
            },
            Portfolio: {
                price: 299.99,
                img: PortfolioImg
            },
            React: {
                price: 349.99,
                img: ReactImg
            },
            Angular: {
                price: 399.99,
                img: AngularImg
            },
            CustomOrder: {
                price: 499.99,
                img: CustomOrderImg
            },
        }
    },
    login: {
        display: true,
        loggedIn: false,
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