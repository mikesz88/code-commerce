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
        const { cart, payment, updateSubState, deleteSubState, shipping } = this.props;
        return(
            <div className={`container ${s.cartFlex}`}>
                <CartContainer 
                    cart={cart} 
                    payment={payment}
                    updateSubState={updateSubState}
                    deleteSubState={deleteSubState}
                />
                <CartSummary
                    payment={payment}
                    updateSubState={updateSubState}
                    cart={cart}
                    shipping={shipping}
                />
            </div>
        )
    }
}

export default Cart;