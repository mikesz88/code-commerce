import React from "react";
import s from '../Payment/PaymentForm.module.css';
import { OTHERCARDS, CARD, CARDICON } from '../JS/constants';
import { cardExpireValidation, 
    cardNumberValidation, 
    onlyTextValidation, 
    securityCodeValidation 
}
from '../JS/validations';

const INIT_CARD = {
    cardHolder: '',
    card: '',
    expiry: '',
    securityCode: '',
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

    updatePayment = (state, func) => this.props.updatePayment(state, func);
    updateConfirmed = (state, func) => this.props.updateConfirmed(state, func);
    updateCurrentUser = (state, func) => this.props.updateCurrentUser(state, func);
    updateDisabledButton = (state, func) => this.props.updateDisabledButton(state,func);



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
                errorText === '' ? this.updateDisabledButton({[type]: false}) : this.updateDisabledButton({[type]: true}) 
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
                errorText === undefined ? this.updateDisabledButton({[type]: false}) : this.updateDisabledButton({[type]: true}) 
                this.setState(prevState => ({ error: {...prevState.error, cardHolderError: errorText}}))
                break;
            case 'expiryMonth':
                errorText = cardExpireValidation(this.state.cardData.expiry);
                this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
                break;
            case 'expiryYear':
                errorText = cardExpireValidation(this.state.cardData.expiry);
                errorText === undefined ? this.updateDisabledButton({[type]: false}) : this.updateDisabledButton({[type]: true}) 
                this.setState(prevState => ({ error: {...prevState.error, expiryError: errorText}}))
                break;
            case 'securityCode':
                errorText = securityCodeValidation(3, value);
                errorText === undefined ? this.updateDisabledButton({[type]: false}) : this.updateDisabledButton({[type]: true}) 
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
                    expiry: `${value}/${prevState.expiryYear}` 
                }
            }))
        } else if (name === 'expiryYear') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value,
                cardData: {
                    ...prevState.cardData,
                    expiry:`${prevState.expiryMonth}/${value}`
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

    proceedToPayment = () => {
        this.updatePayment({display: false})
        this.updateConfirmed({display: true})
    }

    handlePayment = (e) => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (!errorCheck) {
            this.updatePayment({paymentInfo: {
                ...this.state.cardData,
                cardType: this.state.cardType,
            }});
            this.updateCurrentUser({
                ...this.props.CurrentUser,
                cart: this.props.cart,
                shipping: this.props.shipping,
                payment: this.props.payment
            })
            this.setState({
                cardData: INIT_CARD,
                cardType: null,
            });
            this.proceedToPayment();
        }

    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});


    render() {
        const { 
            cardData, error, cardType, maxLength
        } = this.state;

        const paymentFieldsFilled = (Object.keys(cardData).every(item => cardData[item]))

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

        const errorExpiryMessage = (
            error 
            && error['expiryError']
            && error['expiryError'].length > 1) 
            ? error['expiryError']
            : null;
            
        const errorSecurityCodeMessage = (
            error
            && error['securityCodeError']
            && error['securityCodeError'].length > 1)
            ? error['securityCodeError']
            : null;

        return (
            <div className={s.cardFormContainer}>
                <h3 className={`header-sm`}>Payment Information</h3>
                <hr />
                <form id='paymentForm' onSubmit={this.handlePayment}>
                    <div className={s.inputContainer}>
                        <label>CardHolder Name</label>
                        <input 
                            placeholder="Card Holder's Name"
                            type="text" 
                            value={cardData && cardData.cardHolder}
                            onChange={this.handleInputData} 
                            autoComplete="off"
                            name="cardHolder"
                            onBlur={this.handleBlur}
                        />
                        {errorCardHolderMessage && <span className={s.error}>{errorCardHolderMessage}</span>}
                    </div>
                    <div className={`${s.inputContainer} ${s.flexContainer}`}>
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
                                        top: '1px',
                                        right: 0,
                                        width: '25%',
                                        height: '94%',
                                        backgroundColor: 'rgba(255, 255, 255, .87)',
                                    }}
                                    src={CARDICON[cardType]} 
                                    alt="card" 
                                />
                            )}
                        </div>
                        {errorCardNumberMessage && <div className={s.error}>{errorCardNumberMessage}</div>} 
                    </div>
                    <div className={`${s.flexContainer} ${s.inputContainer}`}>
                        <label>Exp.Date</label>
                        <select className={s.selectBackground} onChange={this.handleInputData} onBlur={this.handleBlur} name="expiryMonth" id="expiryMonth">
                            <option value="" disabled selected>Month</option>
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
                        <select className={s.selectBackground} onChange={this.handleInputData} onBlur={this.handleBlur} name="expiryYear" id="expiryYear">
                            <option value="" disabled selected>Year</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                        </select>
                        {errorExpiryMessage && <div className={s.error}>{errorExpiryMessage}</div>}                            
                    </div>
                    <div className={`${s.flexContainer} ${s.inputContainer}`}>
                        <label>CVV</label>
                        <input 
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur} 
                        type="number" 
                        name="securityCode"
                        />
                        {errorSecurityCodeMessage && <div className={s.error}>{errorSecurityCodeMessage}</div>}                            
                    </div>
                    <div className={`${s.submitButton}`}>
                        <button disabled={!paymentFieldsFilled} className={`btn btn-primary round-pill`} type="submit">PAY {this.moneyDenomination(this.props.payment.cartTotal)}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PaymentForm;