import React from 'react';
import s from '../components/ShippingForm.module.css';
import { countryList } from './stateLogin';

/* 
1. Finish Shipping logic (it is repeatedly adding because of the asynchronous part and checked issues)
***Add shipping reset of values if they go back to store or cart***
2. Finish the checkErrorBeforeSave to make it error check every input
3. update the payment button to check for error messaging with the or option of the 9 due to the google autofill
4. Confirm, but then move on to payment.
 */

const INIT_CARD = {
    delivery: '',
    firstName: '',
    lastName: '',
    postCode: '',
    phoneNumber: '',
    addressTitle: '',
    address: '',
    country: '',
    cityTown: '',
    stateProvince: '',
    error: {}
}


class ShippingForm extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = INIT_CARD;
    }

    
    updatePayment = (state, func) => this.props.updatePayment(state, func);
    updateShipping = (state, func) => this.props.updateShipping(state,func);
    updateDisabledButton = (state, func) => this.props.updateDisabledButton(state,func);


    handleInputData = e => {
        e.preventDefault()
        const { name, value } = e.target;
        if (name === 'phoneNumber' & value.length < 10) {
            this.setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        } else if (name === 'phoneNumber') {
            let cleaned = ('' + value).replace(/\D/g, '');
            let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            console.log(match);
            if (match) {
                this.setState(prevState => ({
                    ...prevState,
                    [name]: '(' + match[1] + ') ' + match[2] + '-' + match[3]
                }))
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    [name]: value
                })) 
            }
        } else if (name !== 'phoneNumber' && name !== 'delivery') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value.toUpperCase()
            }))
        } else if (name === 'delivery') {
                this.updatePayment({cartTotal: this.props.payment.cartTotal - this.props.payment.shippingTotal}, this.updatePayment({shippingTotal: 0}));
            if (value === 'standardDelivery') {
                if (this.props.payment.cartTotal >= 250) {
                    this.updatePayment({shippingTotal: 0});
                } else {
                    this.updatePayment({shippingTotal: 25}, this.updatePayment({cartTotal: (this.props.payment.cartTotal + 25)}));
                }
            } else {
                    this.updatePayment({shippingTotal: 50}, this.updatePayment({cartTotal: (this.props.payment.cartTotal + 50)}));
            }
        }
      }

    firstNameCheck = value => {
        const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
        const error = letterRegex.test(value);
        return !error ? 'Please enter a valid First Name' : undefined;
      }
    
    lastNameCheck = value => {
        const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
        const error = letterRegex.test(value);
        return !error ? 'Please enter a valid Last Name' : undefined;
      }
    
    postCodeCheck = value => {
        const postalCodeRegex = /^\d{5}$/;
        const error = postalCodeRegex.test(value);
        return !error ? 'Must be a 5 digit ZIP Code' : undefined;
      }

    phoneCheck = value => {
        const phoneNumberRegex = /^\(\d{3}\)\s\d{3}-\d{4}/;
        const error = phoneNumberRegex.test(value);
        return !error ? 'Please enter a valid Phone Number' : undefined;
    }

    otherFieldCheck = value => {
        return !value ? 'Required' : undefined;
    }

    handleValidations = (target, value) => {
        let errorText;
        switch (target) {
            case 'firstName':
                errorText = this.firstNameCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, firstName: errorText }}))
            break;      
            case 'lastName':
                errorText = this.lastNameCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, lastName: errorText }}))
            break;
            case 'postCode':
                errorText = this.postCodeCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, postCode: errorText }}))
            break;
            case 'phoneNumber':
                errorText = this.phoneCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, phone: errorText }}))
            break;
            default:
                errorText = this.otherFieldCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, [target]: errorText }}))
            break;
        }
      }

    handleBlur = e => this.handleValidations(e.target.name, e.target.value);

    proceedToPayment = () => {
        this.updateShipping({display: false})
        this.updatePayment({display: true})
    }

    checkErrorBeforeSave = () => {
        return false
    }

    onSubmit = e => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (!errorCheck) {
            this.updateShipping({shippingInfo: this.state});
            this.setState({INIT_CARD})
            this.proceedToPayment();
            console.log('test');
        }
    }

    render() {
        const {
          firstName,
          lastName,
          postCode,
          phone,
          addressTitle,
          address,
          country,
          cityTown,
          stateProvince,
        } = this.state.error;

        return (
            <div className={s.shippingInfoContainer}>
                <h3 className={`header-sm`}>Shipping Info</h3>
                <hr />
                <form id='shippingForm' onSubmit={this.onSubmit}>
                    <div className={s.flexContainer}>
                        <select onBlur={this.handleBlur} onChange={this.handleInputData} name="addressTitle" id="addressTitle">
                            <option className={s.firstOption} value="">Type of Address</option>,
                            <option value="residence" defaultChecked>Residence</option>
                            <option value="business">Business</option>
                        </select>                                    
                        {addressTitle ? (<div className={s.errorMessage}>{addressTitle}</div>) : null}
                    </div>                      
                    <div className={s.flexContainer}>
                        <input placeholder='First Name' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="firstName" id="firstName" value={this.state.firstName}/>
                        {firstName ? (<div className={s.errorMessage}>{firstName}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='Last Name' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="lastName" id="lastName" value={this.state.lastName}/>
                        {lastName ? (<div className={s.errorMessage}>{lastName}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='Address' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="address" id="address" value={this.state.address}/>
                        {address ? (<div className={s.errorMessage}>{address}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='Zip Code' onBlur={this.handleBlur} onChange={this.handleInputData} type="number" name="postCode" id="postCode" value={this.state.postCode}/>
                        {postCode ? (<div className={s.errorMessage}>{postCode}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <select onBlur={this.handleBlur} onChange={this.handleInputData} name="country" id="country">
                        {countryList}
                        </select>
                        {country ? (<div className={s.errorMessage}>{country}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='City/Town' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="cityTown" id="cityTown" value={this.state.cityTown}/>
                        {cityTown ? (<div className={s.errorMessage}>{cityTown}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='State/Province' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="stateProvince" id="stateProvince" value={this.state.stateProvince}/>
                        {stateProvince ? (<div className={s.errorMessage}>{stateProvince}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input placeholder='Phone' onBlur={this.handleBlur} onChange={this.handleInputData} type="tel" name="phoneNumber" id="phoneNumber" maxLength='14' value={this.state.phoneNumber} autoComplete='off'/>
                        {phone ? (<div className={s.errorMessage}>{phone}</div>) : null}
                    </div>
                </form>
                <hr />
                <div>
                    <h3 className={`header-sm`}>Shipping Method</h3>
                    <div className={s.flexColumn}>
                        <div>
                            <input onChange={this.handleInputData} type="radio" name="delivery" value='standardDelivery' id="standardDelivery" />
                            <label>Standard</label>
                            <span>Delivery in 4-6 Business Days - Free ($250 min.)</span>
                        </div>
                        <div>
                            <input onChange={this.handleInputData} type="radio" name="delivery" value='expressDelivery' id="expressDelivery" />
                            <label>Express</label>
                            <span>Delivery in 1-3 Business Days - $50.00</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ShippingForm;