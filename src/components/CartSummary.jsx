/* 
1. Fix Subtotal
2. update Checkout button (do not forget when zero it must be disabled.) and move it to the shipping screen.
3. Update Cart Total (do not forget it will include shipping) 
*/

import React from 'react';
import s from '../components/CartSummary.module.css';

class CartSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.discountNames = {
            codeMaster: .10,
            selfTaughtJason: .25,
            halfOff: .5,
        }
        this.state = {
            coupon: undefined,
            error: undefined
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const matchedDiscount = Object.keys(this.discountNames)
        .find(name => name.toLowerCase() === this.state.coupon.toLowerCase());
        return matchedDiscount 
        ? this.props.updateSubState('commerceComponents', 'payment', {discount: this.discountNames[matchedDiscount]}) 
        : this.setState({ error: 'Not a Valid Coupon. Try again'});
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});


    render() {
        return(
            <div className={s.cartSummaryContainer}>
                <>
                    <h3 className={`header-sm`}>Summary</h3>
                    <hr />
                    <div>
                        <label className={`caption`}>Do you have a promo code?</label>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" name="coupon" id="coupon" placeholder='code' onChange={this.handleChange}/>
                            <button type="submit">APPLY</button>
                            {this.state.error 
                            ? <div className={s.error}>{this.state.error}</div> 
                            : null}
                        </form>
                    </div>
                    <hr />
                    <div>
                        <div className={s.flexCartCompute}> 
                            <span>Cart Subtotal:</span>
                            <span>{this.moneyDenomination(this.props.payment.subTotal)}</span>
                        </div>
                        <div className={s.flexCartCompute}> 
                            <span>Shipping & Handling:</span>
                            <span>{this.props.shipping.shippingTotal ? this.props.shipping.shippingTotal : this.moneyDenomination(0)}</span>
                        </div>
                        <div className={s.flexCartCompute}> 
                            <span>Discount:</span>
                            <span>{this.props.payment.discount ? this.moneyDenomination(this.discountAmount()) : this.moneyDenomination(0)}</span>
                        </div>
                        <div className={s.flexCartCompute}> 
                            <span><strong>Cart Total:</strong></span>
                            <span>{this.moneyDenomination(0)}</span>
                        </div>
                        <hr />
                    </div>
                    {/* logic */}<button onClick={this.checkout}>CHECKOUT</button>
                </>
            </div>
        )
    }
}

export default CartSummary;