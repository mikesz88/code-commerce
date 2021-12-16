import React from "react";
import s from '../components/PaymentForm.module.css';
// import { } from './stateLogin';

/* 
1. Finish Payment Summary to show shipping information
2. Finish design of inputs to include errorMessage portions 
3. Grab Credit Card Info and validations and create them here.
4. Start Logic for Payment Form
5. Create a Confirmation Component
5. Reorganize Component Folder to show folders of each component
 and within each a folder showing each component of that.
*/


const INIT_CARD = {
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    error: {}
}

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = INIT_CARD
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});


    render() {
        return (
            <div className={s.cardFormContainer}>
                <h3 className={`header-sm`}>Payment Information</h3>
                <hr />
                <form id='paymentForm'>
                    <div className={s.inputContainer}>
                        <label>CardHolder Name</label>
                        <input onChange={this.handleChange} onBlur={this.handleBlur} type="number" name="cardName" id="cardName" />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Card Number</label>
                        <input onChange={this.handleChange} onBlur={this.handleBlur} type="number" name="cardNumber" id="cardNumber" />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Exp.Date</label>
                        <select name="expiryMonth" id="expiryMonth">
                            <option value=""></option>
                        </select>
                        <select name="expiryYear" id="expiryYear">
                            <option value=""></option>
                        </select>
                    </div>
                    <div className={s.inputContainer}>
                        <label>CVV</label>
                        <input onChange={this.handleChange} onBlur={this.handleBlur} type="number" name="cvv" id="cvv" />
                    </div>
                    <div className={`${s.submitButton}`}>
                        <button className={`btn btn-primary round-pill`} type="submit">PAY {this.moneyDenomination(this.props.payment.cartTotal)}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PaymentForm;