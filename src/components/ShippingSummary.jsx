import React from 'react';
import s from '../components/ShippingSummary.module.css';
import ShippingSummaryItem from './ShippingSummaryItem';

class ShippingSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            shippingErrors: this.props.shipping.error
        }
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    render() {
        const { payment, cart } = this.props;
        const amountOfItemsInCart = Object.keys(cart).filter(item => item !== 'display').length;
        const disabledButton = !(Object.keys(this.props.disabled).every(item => this.props.disabled[item] === false) 
        && Object.keys(this.props.disabled).length === 9);
        return (
            <div className={s.ShippingSummaryContainer}>
                <h3 className={`header-sm`}>Summary</h3>
                <hr />
                <div><strong>{amountOfItemsInCart} items</strong> in your cart.</div>
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
                        <span>{payment.discount ? this.moneyDenomination(payment.discount) : this.moneyDenomination(0)}</span>
                    </div>
                    <div className={s.flexShippingNumbers}> 
                        <span><strong>Cart Total:</strong></span>
                        <span>{this.moneyDenomination(payment.cartTotal)}</span>
                    </div>
                    <hr />
                </div>
                <button type='submit' form='shippingForm' disabled={disabledButton} >PAYMENT</button>
            </div>
        )
    }
}

export default ShippingSummary;