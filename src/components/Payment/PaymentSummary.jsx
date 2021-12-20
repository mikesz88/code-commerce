import React from "react";
import s from '../Payment/PaymentSummary.module.css';
import ShippingSummaryItem from "../Shipping/ShippingSummaryItem";

class PaymentSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    
    render() {
        const { payment, cart, shipping } = this.props;
        const { shippingInfo } = shipping;
        const amountOfItemsInCart = Object.keys(cart).filter(item => item !== 'display').length;
        const disabledButton = (Object.keys(this.props.disabled).some(item => this.props.disabled[item] === true));
        

        return (
            <div className={s.paymentSummaryContainer}>
                <h3 className={`header-sm`}>Summary</h3>
                <hr />
                <div><strong>{amountOfItemsInCart} items</strong> in your cart.</div>
                <div className={s.paymentSummaryItemContainer}>
                    {Object
                    .keys(cart)
                    .filter(item => item !=='display')
                    .map((name, index) => (
                        name ? 
                        <ShippingSummaryItem
                            key={index} 
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
                        <span>{payment.shippingTotal === 0 ? 'FREE!' : `${this.moneyDenomination(payment.shippingTotal)}`}</span>
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
                <div>
                    <h3 className={`header-sm`}>Shipping Address</h3>
                    <p></p>
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.cityTown}, {shippingInfo.stateProvince} {shippingInfo.country} {shippingInfo.postCode}</p>
                    <p>Phone: {shippingInfo.phoneNumber}</p>
                    <hr />
                    <h3 className={`header-sm`}>Shipping Method</h3>
                    {shippingInfo.delivery === 'standardDelivery' ? <p>Delivery in 4-6 Business Days</p> : <p>Delivery in 1-3 Business Days</p>}
                </div>
                <button form='paymentForm' disabled={disabledButton} className={`btn btn-primary round-pill ${s.submitButton}`} type="submit">PAY {this.moneyDenomination(this.props.payment.cartTotal)}</button>
            </div>
        )
    }
}

export default PaymentSummary;