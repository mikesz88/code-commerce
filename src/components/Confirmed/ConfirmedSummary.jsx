import React from "react";
import s from '../Confirmed/ConfirmedSummary.module.css';
import ShippingSummaryItem from "../Shipping/ShippingSummaryItem";
import { CARDICON } from '../JS/constants';



class ConfirmedSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    lastFour = () => {
        const card = this.props.payment.paymentInfo.card;
        return card.slice(card.length - 4);
    }

    render() {
        const { payment, cart, shipping } = this.props;
        const { shippingInfo } = shipping;
        const { cardType } = payment.paymentInfo;

        return (
            <div className={`${s.confirmContainer}`}>
                <h3 className={`header-sm`}>Summary</h3>
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
                <div className={s.shippingInfoContainer}>
                    <h3 className={`header-sm`}>Shipping</h3>
                    <div>{shippingInfo.firstName} {shippingInfo.lastName}</div>
                    <div>{shippingInfo.address}</div>
                    <div>{shippingInfo.cityTown}, {shippingInfo.stateProvince} {shippingInfo.country} {shippingInfo.postCode}</div>
                    <div>Phone: {shippingInfo.phoneNumber}</div>
                    <h3 className={`header-sm`}>Shipping Method</h3>
                    {shippingInfo.delivery === 'standardDelivery' ? <div>Delivery in 4-6 Business Days</div> : <div>Delivery in 1-3 Business Days</div>}
                </div>
                <hr />
                <div>
                <h3 className={`header-sm`}>Payment</h3>
                <div className={s.paymentInfoContainer}>
                    <img className={s.cardIcon} src={CARDICON[cardType]} alt="card" />
                    <span>{cardType}</span>
                    <span>Total Payment: {this.moneyDenomination(payment.cartTotal)}</span>
                    <span>Credit Card: *{this.lastFour()}</span>
                </div>
                </div>
                    {/*
                        money portion flex right
                        Shipping details
                        Payment details
                  */}
            </div>
        )
    }
}

export default ConfirmedSummary;