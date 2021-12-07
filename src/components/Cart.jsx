import React from 'react';
import s from '../components/Cart.module.css';
import CartContainer from './CartContainer';
import CartSummary from './CartSummary';


class Cart extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }
    render() {
        const { cart } = this.props;
        return(
            <div className={`container ${s.cartFlex}`}>
                <CartContainer cart={cart} />
                <CartSummary/>
            </div>
        )
    }
}

export default Cart;