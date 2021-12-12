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
        const { 
            cart, 
            payment, 
            shipping, 
            updateCart, 
            updatePayment,
            updateShipping, 
            deleteCartItem, 
            deletePaymentItem, 
        } = this.props;
        return(
            <div className={`container ${s.cartFlex}`}>
                <CartContainer 
                    cart={cart} 
                    payment={payment}
                    updateCart={updateCart}
                    updatePayment={updatePayment}
                    deleteCartItem={deleteCartItem}
                    deletePaymentItem={deletePaymentItem}
                />
                <CartSummary
                    payment={payment}
                    cart={cart}
                    shipping={shipping}
                    updatePayment={updatePayment}
                    updateCart={updateCart}
                    updateShipping={updateShipping}
                />
            </div>
        )
    }
}

export default Cart;