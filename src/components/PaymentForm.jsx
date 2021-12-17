import React from "react";
import s from '../components/PaymentForm.module.css';
// import { } from './stateLogin';
import { OTHERCARDS, CARD, CARDICON } from './constants';
import { cardExpireValidation, 
    cardNumberValidation, 
    onlyTextValidation, 
    securityCodeValidation 
}
from './validations';

/* 
4. Start Logic for Payment Form
Currently working on expiry input and error message

***pictures are potentially too big so shrink them!*** use the small image size to see if that will work
1. Finish Payment Summary to show shipping information
2. Finish design of inputs to include errorMessage portions 
5. Create a Confirmation Component
5. Reorganize Component Folder to show folders of each component
 and within each a folder showing each component of that.
*/


const INIT_CARD = {
    cardHolder: '',
    card: '',
    expiry: '',
    securityCode: '',
    error: {}
}

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: INIT_CARD,
            maxLength: OTHERCARDS.length,
            error: {},
            cardType: null,
            expiryMonth: '',
            expiryYear: ''
        }
    }

    findDebitCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        };

        for (const card in regexPattern) {
            if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        }

        return '';
    }

    handleValidations = (type, value) => {
        let errorText;
        switch(type) {
            case 'card':
                errorText = cardNumberValidation(value);
                this.setState(prevState => ({
                    cardType: this.findDebitCardType(value),
                    error: {
                        ...prevState.error,
                        cardError: errorText,
                    },
                }));
                break;
            case 'cardHolder': 
                errorText = onlyTextValidation(value);
                this.setState(prevState => ({ error: {...prevState.error, cardHolderError: errorText}}))
                break;
            case 'expiry':
                errorText = cardExpireValidation(value);
                this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
                break;
            case 'securityCode':
                errorText = securityCodeValidation(3, value);
                this.setState(prevState => ({ error: {...prevState.error, securityCodeError: errorText}}))
                break;
            default:
                break;
        }
    }

    handleBlur = ({target: {name, value}}) => this.handleValidations(name, value);

    handleInputData = ({target: {name, value}}) => {

        if (name === 'card') {
            let mask = value.split(' ').join('');
            if (mask.length) {
                mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
                this.setState(prevState => ({ 
                    cardData: { 
                        ...prevState.cardData,
                        [name]: mask
                    }
                }));
            } else {
                this.setState(prevState => ({ 
                    cardData: { 
                        ...prevState.cardData,
                        [name]: ''
                    }
                }));
            }
        } else if (name === 'expiryMonth') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value,
                cardData: {
                    ...prevState.cardData,
                    expiry: value + prevState.expiryYear 
                }
            }))
        } else if (name === 'expiryYear') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value,
                cardData: {
                    ...prevState.cardData,
                    expiry: prevState.expiryMonth + value
                }
            }))
        } else {
            this.setState(prevState => ({ 
                cardData: { 
                    ...prevState.cardData,
                    [name]: value
                }
            }));
        }
    }

    checkErrorBeforeSave = () => {
        const { cardData, error } = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(cardData).forEach(val => {
            let checkError = `${val}Error`;
            if (!cardData[val].length || error[checkError]) {
                error[checkError] 
                ? errorValue = { ...errorValue, [checkError]: error[checkError]}
                : errorValue = { ...errorValue, [checkError]: 'Required'};
                isError = true;
            }
        });
        this.setState({ error: errorValue });
        return isError;
    }

    handleAddCard = (e) => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (!errorCheck) {
            this.setState({
                cardData: INIT_CARD,
                cardType: null,
            });
        }        
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});


    render() {
        const { 
            cardData, error, cardType, maxLength
        } = this.state;

        const errorCardHolderMessage =  (
            error
            && error['cardHolderError']
            && error['cardHolderError'].length > 1)
            ? error['cardHolderError']
            : null;

        const errorCardNumberMessage =  (
            error
            && error['cardError']
            && error['cardError'].length > 1)
            ? error['cardError']
            : null;

        return (
            <div className={s.cardFormContainer}>
                <h3 className={`header-sm`}>Payment Information</h3>
                <hr />
                <form id='paymentForm' onSubmit={this.handleAddCard}>
                    <div className={s.inputContainer}>
                        <label>CardHolder Name</label>
                        <input 
                            placeHolder="Card Holder's Name"
                            type="text" 
                            value={cardData && cardData.cardHolder}
                            onChange={this.handleInputData} 
                            autoComplete="off"
                            name="cardHolder"
                            onBlur={this.handleBlur}
                        />
                        {errorCardHolderMessage && <span className={s.error}>{errorCardHolderMessage}</span>}
                    </div>
                    <div className={`${s.inputContainer} ${s.cardNumberContainer}`}>
                        <label>Card Number</label>
                        <div className={s.cardNumberInputBorder}>
                            <input
                                className={s.cardNumberTransparentBorder} 
                                placeholder="Card Number"
                                type="text" 
                                value={cardData && cardData.card}
                                onChange={this.handleInputData} 
                                autoComplete="off"
                                maxLength={maxLength}
                                name="card"
                                onBlur={this.handleBlur}
                            />
                            {(!error || !error.cardError) && CARD.includes(cardType) && (
                                <img
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '10px',
                                        width: '50px',
                                        height: '33px'
                                    }}
                                    src={CARDICON[cardType]} 
                                    alt="card" 
                                />
                            )}
                        </div>
                        {errorCardNumberMessage && <div className={s.error}>{errorCardNumberMessage}</div>}
                        
                    </div>
                    <div className={s.inputContainer}>
                        <label>Exp.Date</label>
                        <select onChange={this.handleInputData} name="expiryMonth" id="expiryMonth">
                            <option value="" disabled selected></option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select onChange={this.handleInputData} name="expiryYear" id="expiryYear">
                            <option value="" disabled selected></option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                        </select>
                    </div>
                    <div className={s.inputContainer}>
                        <label>CVV</label>
                        <input 
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur} 
                        type="number" 
                        name="securityCode"
                        
                        />
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