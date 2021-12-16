import React from 'react';
import s from '../components/Payment.module.css';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';

class Payment extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            disabledButton: false
        }
    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state, func);
    updateStoreDisplay = (state, func) => this.props.updateStoreDisplay(state, func);    
    updatePayment = (state, func) => this.props.updatePayment(state, func);

    backToStore = () => {
        this.updatePayment({display: false});
        this.updateStoreDisplay({display: true});
        this.updatePayment({cartTotal: this.props.payment.subTotal});
        this.updatePayment({shippingTotal: 0});
        this.updatePayment({discount: 0});
    }

    backToCart = () => {
        this.updatePayment({display: false});
        this.updateCart({display: true});
        this.updatePayment({cartTotal: this.props.payment.subTotal});
        this.updatePayment({shippingTotal: 0});
        this.updatePayment({discount: 0});
    }

    backToShipping = () => {
        this.updatePayment({display: false});
        this.updateShipping({display: true});
        this.updatePayment({cartTotal: this.props.payment.subTotal - this.props.payment.discount});
        this.updatePayment({shippingTotal: 0});
    }
    
    
    render() {
        return(
            <>
                <div className={s.buttonDisplay}>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToStore}>Back to Store</button>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToCart}>Back to Cart</button>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToShipping}>Back to Shipping</button>
                </div>
                <div className={`container ${s.cartFlex}`}>
                    <PaymentForm 
                        payment={this.props.payment}
                    />
                    <PaymentSummary
                        payment={this.props.payment}
                        cart={this.props.cart}
                        shipping={this.props.shipping}
                        disabled={this.state.disabledButton}
                    />
                </div>
            </>        )
    }
}

export default Payment;