import React from 'react';
import s from '../components/CodeItemsForSale.module.css';

class CodeItemsForSale extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
/*         this.state = {
            storeDisplay: this.props.storeDisplay,
            codeItems: this.props.codeItems,
            cart: this.props.cart,
            payment: this.props.payment,
            currentUser: this.props.currentUser,
        } */

    }    
    updateLogin = (state, func) => this.props.updateLogin(state, func);
    updateCart = (state, func) => this.props.updateCart(state, func);
    updatePayment = (state, func) => this.props.updatePayment(state, func);
    updateStoreDisplay= (state, func) => this.props.updateStoreDisplay(state, func);
    updateCurrentUser = (state, func) => this.props.updateCurrentUser(state, func);
    deleteCartItem = name => this.props.deleteCartItem(name);
    deletePaymentItem = name => this.props.deletePaymentItem(name);


    updateBasket = (name, value) => {
        const { subTotal, cartTotal } = this.props.payment;
        const price = value['price'];
        this.updateCart({[name]: value});
        this.updatePayment({[name]: price});
        this.updatePayment({subTotal: subTotal + price});
        this.updatePayment({cartTotal: cartTotal + price});
    }

    deleteItem = (name, value) => {
        const { subTotal, cartTotal } = this.props.payment;
        const price = value['price'];
        this.deleteCartItem(name);
        this.deletePaymentItem(name);
        this.updatePayment({subTotal: subTotal - price});
        this.updatePayment({cartTotal: cartTotal - price});
    }

    login = () => {
        this.updateStoreDisplay({display: false})
        this.updateLogin({display: true})
    }

    checkLogin = (name, value) => {
        this.props.currentUser ? this.updateBasket(name, value) : this.login();
    }

    
    render() {
        const { codeItems } = this.props;
        const price = 'price';
        const img = 'img';

        return(
            <div className={`container`}>
                <div className={`${s.loginCenter}`}>
                    <button className={`btn btn-primary round-pill`} onClick={this.login}>Log in</button>
                </div>
                <div className={`${s.codeStoreContainer}`}>
                {Object.keys(codeItems).map(code => (
                    <div className={s.cardContainer}>
                        <h3 className={`header-sm`}>{code}</h3>
                        <img src={codeItems[code][img]} alt="" />
                        <p className={`caption`}>${codeItems[code][price]}</p>
                        {!Object.keys(this.props.cart).includes(code)
                        ? <button onClick={() => this.checkLogin(code, codeItems[code])}>Add to Cart</button>
                        : <button onClick={() => this.deleteItem(code, codeItems[code])}>Remove from Cart</button>}
                    </div>
                ))}
                </div>
                <div className={s.directions}>
                    <h3 className={`header-md`}> Click any to add to cart!</h3>
                    <p className={`caption`}>You must log in first before you are able to add to cart!</p>
                    <button className={`btn btn-primary round-pill`} onClick={this.login}>Log in</button>
                </div>
            </div>
        )
    }
}

export default CodeItemsForSale;