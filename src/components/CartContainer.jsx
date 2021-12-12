import React from 'react';
import s from '../components/CartContainer.module.css';
import CartHeader from './CartHeader';
import CartItems from './CartItems';

class CartContainer extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    render() {
        const { 
            cart, 
            payment, 
            updateCart, 
            updatePayment, 
            deleteCartItem, 
            deletePaymentItem 
        } = this.props;
        return(
            <div className={s.cartInfoContainer}>
                <CartHeader />
                {Object.keys(cart).map(name => (
                    name !== 'display' ?
                    <CartItems 
                        name = {name}
                        img = {cart[name]['img']}
                        price = {cart[name]['price']}
                        file = {cart[name]['file']}
                        linesOfCode = {cart[name]['linesOfCode']}
                        payment={payment}
                        updateCart={updateCart}
                        updatePayment={updatePayment}
                        deleteCartItem={deleteCartItem}
                        deletePaymentItem={deletePaymentItem}
                    /> : null
                ))} 
            </div>
        )
    }
}

export default CartContainer;