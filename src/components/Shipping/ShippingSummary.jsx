import React from 'react';
import s from '../Shipping/ShippingSummary.module.css';
import ShippingSummaryItem from './ShippingSummaryItem';

class ShippingSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    render() {
        const { payment, cart } = this.props;
        const amountOfItemsInCart = Object.keys(cart).filter(item => item !== 'display').length;
        const disabledButton = (Object.keys(this.props.disabled).some(item => this.props.disabled[item] === true));
        return (
            <div className={s.ShippingSummaryContainer}>
                <h3 className={`header-sm`}>Summary</h3>
                <hr />
                <div><strong>{amountOfItemsInCart} items</strong> in your cart.</div>
                <div className={s.shippingSummaryItemContainer}>
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
                <div className={s.paymentButton}>
                    <button className='btn btn-primary round-pill' type='submit' form='shippingForm' disabled={disabledButton} >PAYMENT</button>
                </div>
            </div>
        )
    }
}

export default ShippingSummary;