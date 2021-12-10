/* 
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
            error: undefined,
            discountDisabled: false,
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateCartTotal = (name) => {
        // console.log(this.props.payment.cartTotal, this.props.payment.discount);
        this.props.updateSubState('commerceComponents', 'payment', {cartTotal: this.props.payment.cartTotal - (this.discountNames[name]*this.props.payment.subTotal)})
    }

    updateDiscountAndCartTotal = name => {
        // console.log(this.discountNames[name]);
        this.props.updateSubState('commerceComponents', 'payment', {discount: this.discountNames[name]*this.props.payment.subTotal}, this.updateCartTotal(name))
        this.setState({
            discountDisabled: true,
            error: undefined
        })
    }

    onSubmit = e => {
        e.preventDefault();
        const matchedDiscount = Object.keys(this.discountNames)
        .find(name => name.toLowerCase() === this.state.coupon.toLowerCase());
        return matchedDiscount 
        ? this.updateDiscountAndCartTotal(matchedDiscount) 
        : this.setState({ error: 'Not a Valid Coupon. Try again'});
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    matchCarts = () => {
        this.props.updateSubState('commerceComponents', 'payment', {cartTotal: this.props.payment.subTotal})
    }

    resetCoupon = () => {
        this.setState({
            discountDisabled: false,
            coupon: '',
            error: undefined
        },this.props.updateSubState('commerceComponents', 'payment', {discount: 0}, this.matchCarts()))
    }

    checkOutButton = () => {
        return Object.keys(this.props.cart).filter(item => item !== 'display').length ? false : true
    }

    checkout = () => {
        this.props.updateSubState('commerceComponents', 'cart', {display: false})
        this.props.updateSubState('commerceComponents', 'shipping', {display: true})

    }
    
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
                            <button disabled={this.state.discountDisabled} type="submit">APPLY</button>
                            {this.state.error 
                            ? <div className={s.error}>{this.state.error}</div> 
                            : null}
                            <button onClick={this.resetCoupon} type='reset'>RESET</button>
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
                            <span>{this.props.payment.discount ? this.moneyDenomination(this.props.payment.discount) : this.moneyDenomination(0)}</span>
                        </div>
                        <div className={s.flexCartCompute}> 
                            <span><strong>Cart Total:</strong></span>
                            <span>{this.moneyDenomination(this.props.payment.cartTotal)}</span>
                        </div>
                        <hr />
                    </div>
                    <button disabled={this.checkOutButton()} onClick={this.checkout}>CHECKOUT</button>
                </>
            </div>
        )
    }
}

export default CartSummary;