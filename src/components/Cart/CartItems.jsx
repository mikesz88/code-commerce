import React from 'react';
import s from '../Cart/CartItems.module.css';

class CartItems extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {}
    }

    updateCart = (state, func) => this.props.updateCart(state, func);
    updatePayment = (state, func) => this.props.updatePayment(state, func);
    deleteCartItem = name => this.props.deleteCartItem(name);
    deletePaymentItem = name => this.props.deletePaymentItem(name);

    
    priceAmount = (e) => {
        const { price, name, payment } = this.props;
        const { subTotal } = payment;
        this.updatePayment({subTotal: subTotal - payment[name] + (Number(e.target.value) * price)});
        this.updatePayment({cartTotal: subTotal - payment[name] + (Number(e.target.value) * price)});
        this.updatePayment({discount: 0});
        this.updatePayment({[e.target.name]: e.target.value * price});
    }

    quantityCount = e => {
        this.setState({
           [e.target.name]: Number(e.target.value)
        }, this.priceAmount(e));
       this.updateCart({[e.target.name]: {
           ...this.props.cart[e.target.name],
            qty: Number(e.target.value)
       }})
    }

    deleteFromCart = () => {
        const { name, payment } = this.props;
        const { subTotal } = payment;
        this.updatePayment({subTotal: subTotal - payment[name]});
        this.updatePayment({cartTotal: subTotal - payment[name]});
        this.deleteCartItem(name)
        this.deletePaymentItem(name)
        this.updatePayment({discount: 0});
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    render() {
        const { 
            name, 
            img,
            price, 
            file, 
            linesOfCode, 
            payment 
        } = this.props;
        return (
            <>
                <hr />
                <div className={`cartFlex`}>
                    <div className={`product productFlex`}>
                        <button className={s.deleteButton} onClick={this.deleteFromCart}><i className="fas fa-times-circle"></i></button>
                        <div className={`img-container`}>
                            <img src={img} alt="" />
                        </div>
                        <div className={`productInfo`}>
                            <span><strong><u>{name}</u></strong></span>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><span>File Size:</span></th>
                                        <td><span>{file}</span></td>
                                    </tr>
                                    <tr>
                                        <th><span>Lines of Code:</span></th>
                                        <td><span>{linesOfCode}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={`other`}>
                        ${price}
                    </div>

                    <div className={`other`}>
                        <select className={s.selectDesign} name={name} id={name} onChange={this.quantityCount}>
                            <option className={s.selectDesign} value="1">1</option>
                            <option className={s.selectDesign} value="2">2</option>
                            <option className={s.selectDesign} value="3">3</option>
                            <option className={s.selectDesign} value="4">4</option>
                            <option className={s.selectDesign} value="5">5</option>
                            <option className={s.selectDesign} value="6">6</option>
                            <option className={s.selectDesign} value="7">7</option>
                            <option className={s.selectDesign} value="8">8</option>
                            <option className={s.selectDesign} value="9">9</option>
                            <option className={s.selectDesign} value="10">10</option>
                        </select>
                    </div>

                    <div className={`other`}>
                        {this.moneyDenomination(payment[name])} 
                    </div>
                </div>
            </>
        )
    }
}

export default CartItems;