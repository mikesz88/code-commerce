import React from 'react';
import s from '../components/Cart.module.css';
import CartContainer from './CartContainer';
import CartSummary from './CartSummary';


class Cart extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updateStoreDisplay = (state, func) => this.props.updateStoreDisplay(state, func);    

    backToStore = () => {
        this.updateCart({display: false})
        this.updateStoreDisplay({display: true})
    }

    render() {
        const { 
            cart, 
            payment, 
            updateCart, 
            updatePayment,
            updateShipping, 
            deleteCartItem, 
            deletePaymentItem, 
        } = this.props;

        return(
            <>
                <div className={`container ${s.storeButtonCenter}`}>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToStore}>Back to Store</button>
                </div>
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
                        updatePayment={updatePayment}
                        updateCart={updateCart}
                        updateShipping={updateShipping}
                    />
                </div>
            </>
        )
    }
}

export default Cart;