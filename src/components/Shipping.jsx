import React from 'react';
import s from '../components/Shipping.module.css';
import ShippingForm from './ShippingForm';
import ShippingSummary from './ShippingSummary';

class Shipping extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            disabled: {
                address: true,
                addressTitle: true,
                cityTown: true,
                country: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                postCode: true,
                stateProvince: true,
                delivery: true,
            }
        }
    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state, func);
    updateStoreDisplay = (state, func) => this.props.updateStoreDisplay(state, func);    
    updatePayment = (state, func) => this.props.updatePayment(state, func);

    backToStore = () => {
        this.updateShipping({display: false});
        this.updateStoreDisplay({display: true});
        this.updatePayment({cartTotal: this.props.payment.subTotal});
        this.updatePayment({shippingTotal: 0});
        this.updatePayment({discount: 0});
    }

    backToCart = () => {
        this.updateShipping({display: false});
        this.updateCart({display: true});
        this.updatePayment({cartTotal: this.props.payment.subTotal});
        this.updatePayment({shippingTotal: 0});
        this.updatePayment({discount: 0});
    }

    updateState = (name, state, func) => {
        this.setState(prevState => ({
            [name]: {
            ...prevState[name],
            ...state
            }
        }), func)
    }

    updateDisabledButton = (state, func) => this.updateState('disabled', state, func);

    render() {
        const { 
            cart, 
            payment, 
            shipping, 
            updatePayment,
            updateShipping, 
        } = this.props;
        const {disabled} = this.state;
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
                        disabled={disabled}
                        updateDisabledButton={this.updateDisabledButton}
                    />
                    <ShippingSummary
                        payment={payment}
                        cart={cart}
                        shipping={shipping}
                        disabled={disabled}
                    />
                </div>
                </>
        )
    }
}

export default Shipping;