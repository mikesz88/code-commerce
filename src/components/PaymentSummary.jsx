import React from "react";
import s from '../components/PaymentSummary.module.css';
import ShippingSummaryItem from "./ShippingSummaryItem";

class PaymentSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    
    render() {
        const { payment, cart } = this.props;
        const amountOfItemsInCart = Object.keys(cart).filter(item => item !== 'display').length;
        return (
            <div className={s.paymentSummaryContainer}>
                <h3>Summary</h3>
                <hr />
                <div><strong>{amountOfItemsInCart} items</strong> in your cart.</div>
                <div className={s.paymentSummaryItemContainer}>
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
                </div>
                <hr />
                <div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Cart Subtotal:</span>
                        <span>{this.moneyDenomination(payment.subTotal)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Shipping & Handling:</span>
                        <span>{payment.shippingTotal ? this.moneyDenomination(payment.shippingTotal) : this.moneyDenomination(0)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span>Discount:</span>
                        <span>-{payment.discount ? this.moneyDenomination(payment.discount) : this.moneyDenomination(0)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span><strong>Cart Total:</strong></span>
                        <span>{this.moneyDenomination(payment.cartTotal)}</span>
                    </div>
                    <hr />
                </div>
                {/* Shipping Info */}
                <button form='paymentForm' className={`btn btn-primary round-pill`} type="submit">PAY {this.moneyDenomination(this.props.payment.cartTotal)}</button>
            </div>
        )
    }
}

export default PaymentSummary;