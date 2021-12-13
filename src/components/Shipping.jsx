import React from 'react';
import s from '../components/Shipping.module.css';
import ShippingForm from './ShippingForm';
import ShippingSummary from './ShippingSummary';

class Shipping extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state, func);
    updateStoreDisplay = (state, func) => this.props.updateStoreDisplay(state, func);    

    backToStore = () => {
        this.updateShipping({display: false});
        this.updateStoreDisplay({display: true});
    }

    backToCart = () => {
        this.updateShipping({display: false});
        this.updateCart({display: true});
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
        return (
                <>
                <div className={s.buttonDisplay}>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToStore}>Back to Store</button>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToCart}>Back to Cart</button>
                </div>
                <div className={`container ${s.cartFlex}`}>
                    <ShippingForm 
                        shipping={shipping}
                        payment={payment}
                        updateShipping={updateShipping}
                        updatePayment={updatePayment}
                    />
                    <ShippingSummary
                        payment={payment}
                        cart={cart}
                        updateShipping={updateShipping}
                        updatePayment={updatePayment}
                        />
                </div>
                </>
        )
    }
}

export default Shipping;