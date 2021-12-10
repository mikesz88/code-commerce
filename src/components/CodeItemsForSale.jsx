import React from 'react';
import s from '../components/CodeItemsForSale.module.css';

class CodeItemsForSale extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }    

    updateCart = (name, value) => {
        this.props.updateSubState('commerceComponents', 'cart', {[name]: value});
        this.props.updateSubState('commerceComponents', 'payment', {[name]: value['price']});
        this.props.updateSubState('commerceComponents', 'payment', {subTotal: this.props.payment.subTotal + value['price']});
        this.props.updateSubState('commerceComponents', 'payment', {cartTotal: this.props.payment.cartTotal + value['price']});
    }

    deleteItem = (name, value) => {
        this.props.deleteSubState('commerceComponents', 'cart', name)
        this.props.deleteSubState('commerceComponents', 'payment', name)
        this.props.updateSubState('commerceComponents', 'payment', {subTotal: this.props.payment.subTotal - value['price']});
        this.props.updateSubState('commerceComponents', 'payment', {cartTotal: this.props.payment.cartTotal - value['price']});
    }

    login = () => {
        this.props.updateSubState('commerceComponents', 'storeDisplay', {'display': false});
        this.props.updateSubState('commerceComponents', 'login', {'display': true});
    }

    checkLogin = (name, value) => {
        this.props.currentUser ? this.updateCart(name, value) : this.login();
    }

    
    render() {
        const { codeItems } = this.props;

        return(
            <div className={`container`}>
                <div className={`${s.loginCenter}`}>
                    <button className={`btn btn-primary round-pill`} onClick={this.login}>Log in</button>
                </div>
                <div className={`${s.codeStoreContainer}`}>
                {Object.keys(codeItems).map(code => (
                    <div className={s.cardContainer}>
                        <h3 className={`header-sm`}>{code}</h3>
                        <img src={codeItems[code]['img']} alt="" />
                        <p className={`caption`}>${codeItems[code]['price']}</p>
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