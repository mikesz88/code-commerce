import React from 'react';
import s from '../components/CartSummary.module.css';

class CartSummary extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div className={s.cartSummaryContainer}>
                <div>
                    <h3 className={`header-sm`}>Summary</h3>
                    <hr />
                    <div>
                        <p className={`caption`}>Do you have a promo code?</p>
                        <form onSubmit={this.onSubmit}> {/* logic */}
                            <input type="text" name="coupon" id="coupon" placeholder="Code"/>
                            <button type="submit">APPLY</button>
                        </form>
                    </div>
                    <hr />
                    <div>
                        <div> 
                            <span>Cart Subtotal:</span>
                            <span>{/* logic */}</span>
                        </div>
                        <div> 
                            <span>Shipping & Handling:</span>
                            <span>{/* logic */}</span>
                        </div>
                        <div> 
                            <span>Discount:</span>
                            <span>{/* logic */}</span>
                        </div>
                        <div> 
                            <span><strong>Cart Total:</strong></span>
                            <span>{/* logic */}</span>
                        </div>
                        <hr />
                    </div>
                    {/* logic */}<button onClick={this.checkout}>CHECKOUT</button>
                </div>
            </div>
        )
    }
}

export default CartSummary;