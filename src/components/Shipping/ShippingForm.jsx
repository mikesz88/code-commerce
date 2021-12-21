import React from 'react';
import s from '../Shipping/ShippingForm.module.css';
import { countryList } from '../JS/stateLogin';

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

    handleRadioButton = e => {
    const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }), () => {
            if (value === 'standardDelivery' && this.props.payment.cartTotal >= 250) {
                this.updatePayment({cartTotal: this.props.payment.cartTotal - this.props.payment.shippingTotal}, () => {
                    this.updatePayment({shippingTotal: 0});
                });
            } else if (value === 'standardDelivery' && this.props.payment.cartTotal < 250) {
                this.updatePayment({cartTotal: this.props.payment.cartTotal - this.props.payment.shippingTotal}, () => {
                    this.updatePayment({shippingTotal: 25}, () => {
                     this.updatePayment({cartTotal: this.props.payment.cartTotal + 25})   
                    });
                });
            } else if (value === 'expressDelivery') {
                this.updatePayment({cartTotal: this.props.payment.cartTotal - this.props.payment.shippingTotal}, () => {
                    this.updatePayment({shippingTotal: 50}, () => {
                     this.updatePayment({cartTotal: this.props.payment.cartTotal + 50})   
                    });
                });
            }
        })
    }

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
        } else if (name !== 'phoneNumber') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value.toUpperCase()
            }))
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

    deliveryCheck = value => !value ? 'Required' : undefined;

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
            case 'delivery':
                errorText = this.deliveryCheck(value);
                errorText === undefined ? this.updateDisabledButton({[target]: false}) : this.updateDisabledButton({[target]: true}) 
                this.setState(prevState => ({  error: { ...prevState.error, delivery: errorText }}))
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
        const { error } = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(this.state).forEach(val => {
            if (val !== 'error') {
                let checkError = val;
                if (!this.state[checkError].length || error[checkError]) {
                    error[checkError]
                    ? errorValue = { ...errorValue, [checkError]: error[checkError]}
                    : errorValue = { ...errorValue, [checkError]: 'Required'};
                    isError = true;
                }
            }
        })
        this.setState({ error: errorValue });
        return isError
    }

    onSubmit = e => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (!errorCheck) {
            this.updateShipping({shippingInfo: this.state});
            this.setState({INIT_CARD})
            this.proceedToPayment();
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
          delivery
        } = this.state.error;

        return (
            <div className={s.shippingInfoContainer}>
                <h3 className={`header-sm`}>Shipping Info</h3>
                <hr />
                <form id='shippingForm' onSubmit={this.onSubmit}>
                    <div className={s.flexContainer}>
                        <select className={s.selectInputBackground} onBlur={this.handleBlur} onChange={this.handleInputData} name="addressTitle" id="addressTitle">
                            <option value="">Type of Address</option>,
                            <option value="residence" defaultChecked>Residence</option>
                            <option value="business">Business</option>
                        </select>                                    
                        {addressTitle ? (<div className={s.errorMessage}>{addressTitle}</div>) : null}
                    </div>                      
                    <div className={s.flexContainer}>
                        <input  className={s.selectInputBackground} placeholder='First Name' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="firstName" id="firstName" autoComplete='off' value={this.state.firstName}/>
                        {firstName ? (<div className={s.errorMessage}>{firstName}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input className={s.selectInputBackground} placeholder='Last Name' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="lastName" id="lastName" autoComplete='off' value={this.state.lastName}/>
                        {lastName ? (<div className={s.errorMessage}>{lastName}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input className={s.selectInputBackground} placeholder='Address' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="address" id="address" autoComplete='off' value={this.state.address}/>
                        {address ? (<div className={s.errorMessage}>{address}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input className={s.selectInputBackground} placeholder='Zip Code' onBlur={this.handleBlur} onChange={this.handleInputData} type="number" name="postCode" id="postCode" autoComplete='off' value={this.state.postCode}/>
                        {postCode ? (<div className={s.errorMessage}>{postCode}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <select className={s.selectInputBackground} onBlur={this.handleBlur} onChange={this.handleInputData} name="country" id="country">
                        {countryList}
                        </select>
                        {country ? (<div className={s.errorMessage}>{country}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input className={s.selectInputBackground} placeholder='City/Town' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="cityTown" id="cityTown" autoComplete='off' value={this.state.cityTown}/>
                        {cityTown ? (<div className={s.errorMessage}>{cityTown}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input  className={s.selectInputBackground} placeholder='State/Province' onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="stateProvince" id="stateProvince" autoComplete='off' value={this.state.stateProvince}/>
                        {stateProvince ? (<div className={s.errorMessage}>{stateProvince}</div>) : null}
                    </div>
                    <div className={s.flexContainer}>
                        <input className={s.selectInputBackground} placeholder='Phone' onBlur={this.handleBlur} onChange={this.handleInputData} type="tel" name="phoneNumber" id="phoneNumber" maxLength='14' value={this.state.phoneNumber} autoComplete='off'/>
                        {phone ? (<div className={s.errorMessage}>{phone}</div>) : null}
                    </div>
                </form>
                <hr />
                <div>
                    <h3 className={`header-sm`}>Shipping Method {delivery ? (<span className={s.errorMessage}>{delivery}</span>) : null}</h3>
                    <div className={s.flexColumn}>
                        <div>
                            <input onChange={this.handleRadioButton} onBlur={this.handleBlur} type="radio" name="delivery" value='standardDelivery' id="standardDelivery" />
                            <label>Standard</label>
                            <span>Delivery in 4-6 Business Days - Free ($250 min.)</span>
                        </div>
                        <div>
                            <input onChange={this.handleRadioButton} onBlur={this.handleBlur} type="radio" name="delivery" value='expressDelivery' id="expressDelivery" />
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