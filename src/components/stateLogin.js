import HTMLandCSSImg from './assets/chris-ried-ieic5Tq8YMk-unsplash.jpg';
import SaaSImg from './assets/fahrul-razi-BR6lrzCPYPk-unsplash.jpg';
import ResponsiveImg from './assets/gabriel-heinzer-g5jpH62pwes-unsplash.jpg';
import JavaScriptImg from './assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg';
import PortfolioImg from './assets/joan-gamell-ZS67i1HLllo-unsplash.jpg';
import ReactImg from './assets/markus-spiske-cvBBO4PzWPg-unsplash.jpg';
import AngularImg from './assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg';
import CustomOrderImg from './assets/pankaj-patel-_SgRNwAVNKw-unsplash.jpg';


export const INIT_CARD = {
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    postCode: '',
    email: '',
    cart: undefined,
    shipping: undefined,
    payment: undefined,
  }

const fakeUser = {
    email: 'fake@devslopes.com',
    password: 'Devslopes0!',
    cart: undefined,
    shipping: undefined,
    payment: undefined,
    firstName: '',
    lastName: '',
    postCode: '',
}

const jasonUser = {
    email: 'jason@devslopes.com',
    password: 'Devslopes0!',
    cart: undefined,
    shipping: undefined,
    payment: undefined,
    firstName: '',
    lastName: '',
    postCode: '',
}

const commerceComponents = {
    storeDisplay : {
        display: false,
        items: {
            HTMLandCSSOnly: {
                price: 99.99,
                img: HTMLandCSSImg,
                file: '50MB',
                linesOfCode: 225
            },
            SaaS: {
                price: 149.99,
                img: SaaSImg,
                file: '75MB',
                linesOfCode: 425
            },
            Responsive: {
                price: 199.99,
                img: ResponsiveImg,
                file: '100MB',
                linesOfCode: 525
            },
            JavaScript: {
                price: 249.99,
                img: JavaScriptImg,
                file: '200MB',
                linesOfCode: 825
            },
            Portfolio: {
                price: 299.99,
                img: PortfolioImg,
                file: '1GB',
                linesOfCode: 1000
            },
            React: {
                price: 349.99,
                img: ReactImg,
                file: '1.25GB',
                linesOfCode: 2500
            },
            Angular: {
                price: 399.99,
                img: AngularImg,
                file: '1.75GB',
                linesOfCode: 2250
            },
            CustomOrder: {
                price: 499.99,
                img: CustomOrderImg,
                file: '5GB',
                linesOfCode: 5000
            },
        }
    },
    login: {
        display: false,
    },
    cart: {
        display: true,
        Angular: {
            price: 399.99,
            img: AngularImg,
            file: '1.75GB',
            linesOfCode: 2250
        },
        CustomOrder: {
            price: 499.99,
            img: CustomOrderImg,
            file: '5GB',
            linesOfCode: 5000
        }
    },
    shipping: {
        display: false
    },
    payment: {
        display: false
    }
};

export const stateComponents = {
    currentUser: false,
    users: {
        fakeUser,
        jasonUser
    },
    commerceComponents,
}