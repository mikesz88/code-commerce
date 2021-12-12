/* 
1. Update store display to show checkOut button as long as current user is true.
2. start working on shipping screen
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

    updateCart = (state, func) => this.props.updateCart(state, func);
    updatePayment = (state, func) => this.props.updatePayment(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state,func)


    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    updateCartTotal = (name) => {
        // console.log(this.props.payment.cartTotal, this.props.payment.discount);
        const { cartTotal, subTotal } = this.props.payment;
        this.updatePayment({cartTotal: cartTotal - (this.discountNames[name]*subTotal)})
    }

    updateDiscountAndCartTotal = name => {
        // console.log(this.discountNames[name]);
        const {subTotal} = this.props.payment;
        this.updatePayment({discount: this.discountNames[name]*subTotal}, this.updateCartTotal(name))
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

    matchCarts = () => this.updatePayment({cartTotal: this.props.payment.subTotal});

    resetCoupon = () => {
        this.setState({
            discountDisabled: false,
            coupon: '',
            error: undefined
        },this.updatePayment({discount: 0}, this.matchCarts()))
    }

    checkOutButton = () => Object.keys(this.props.cart).filter(item => item !== 'display').length ? false : true;

    checkout = () => {
        this.updateCart({display: false})
        this.updateShipping({display: true})

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