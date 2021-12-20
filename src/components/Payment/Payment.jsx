import React from 'react';
import s from '../Payment/Payment.module.css';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import ProgressBar from '../ProgressBar/Progress-bar';


class Payment extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            disabled: {
                card: true,
                cardHolder: true,
                expiryYear: true,
                securityCode: true,
            }
        }
    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state, func);
    updateStoreDisplay = (state, func) => this.props.updateStoreDisplay(state, func);    
    updatePayment = (state, func) => this.props.updatePayment(state, func);
    
    updateState = (name, state, func) => {
        this.setState(prevState => ({
            [name]: {
            ...prevState[name],
            ...state
            }
        }), func)
    }

    updateDisabledButton = (state, func) => this.updateState('disabled', state, func);

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
        return (
            <>
                <ProgressBar 
                        key={3}
                        completed={75}
                />
                <div className={`container ${s.cartFlex}`}>
                    <PaymentForm 
                        payment={this.props.payment}
                        cart={this.props.cart}
                        shipping={this.props.shipping}
                        currentUser={this.props.currentUser}
                        updatePayment={this.updatePayment}
                        updateConfirmed={this.props.updateConfirmed}
                        updateCurrentUser={this.props.updateCurrentUser}
                        updateDisabledButton={this.updateDisabledButton}
                        />
                    <PaymentSummary
                        payment={this.props.payment}
                        cart={this.props.cart}
                        shipping={this.props.shipping}
                        disabled={this.state.disabled}
                    />
                </div>
                <div className={`container ${s.buttonDisplay}`}>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToStore}>Back to Store</button>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToCart}>Back to Cart</button>
                    <button className={'btn btn-primary round-pill'} onClick={this.backToShipping}>Back to Shipping</button>
                </div>
            </>        
        )
    }
}

export default Payment;