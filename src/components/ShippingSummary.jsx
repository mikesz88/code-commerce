import React from 'react';
import s from '../components/ShippingSummary.module.css';
import ShippingSummaryItem from './ShippingSummaryItem';

class ShippingSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    updatePayment = (state, func) => this.props.updatePayment(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state,func)

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    // This needs to be fixed
    checkOutButton = () => Object.keys(this.props.shipping.error).filter(item => item !== 'display').length ? false : true;

    proceedToPayment = () => {
        this.updateShipping({display: false})
        this.updatePayment({display: true})
    }

    render() {
        const { payment, cart } = this.props;
        const amountOfItemsInCart = Object.keys(cart).filter(item => item !== 'display').length;
        return (
            <div className={s.ShippingSummaryContainer}>
                <h3 className={`header-sm`}>Summary</h3>
                <hr />
                <div><strong>{amountOfItemsInCart} items</strong> in your cart.</div>
                <hr />
                <div className={s.shippingSummaryItemContainer}>
                    {Object
                    .keys(cart)
                    .filter(item => item !=='display')
                    .map(name => (
                        name ? 
                        <ShippingSummaryItem 
                            name={name}
                            img = {cart[name]['img']}
                            file = {cart[name]['file']}
                            cartItemQty={cart[name]['qty']}
                            priceWithQty={payment[name]}
                        /> : null
                    ))}
                    {/* 
                    5. Start logic on shipping info and payment button
                */}
                </div>
                <hr />
                <div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Cart Subtotal:</span>
                        <span>{this.moneyDenomination(payment.subTotal)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Shipping & Handling:</span>
                        <span>{payment.shippingTotal ? payment.shippingTotal : this.moneyDenomination(0)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Discount:</span>
                        <span>{payment.discount ? this.moneyDenomination(payment.discount) : this.moneyDenomination(0)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span><strong>Cart Total:</strong></span>
                        <span>{this.moneyDenomination(payment.cartTotal)}</span>
                    </div>
                    <hr />
                </div>
                <button /* disabled=this.checkOutButton() */ onClick={this.proceedToPayment}>PAYMENT</button>
            </div>
        )
    }
}

export default ShippingSummary;