import React from 'react';
import s from '../components/ShippingForm.module.css';
import { countryList } from './stateLogin';

/* 
1. Finish the error message to at least not leave it blank.
2. Figure out a way to store the data onto shipping with a click on the Payment button (create a state variable on payment when clicked it will turn true and store the variables into shipping state
    and go to the next screen.)
3. make sure that payment button is grayed out until all text items are filled with no error message in order to move on.
4. Delivery radio button to included with above payment button requirements. But also show the price reflection on shipping summary with proper logic
5. error messages to show in <th> spots
6. Confirm, but then move on to payment. 
 */


class ShippingForm extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
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
        };
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
        } else if (name !== 'phoneNumber') {
            this.setState(prevState => ({
                ...prevState,
                [name]: value
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

    handleValidations = (target, value) => {
        let errorText;
        switch (target) {
            case 'firstName':
                errorText = this.firstNameCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, firstName: errorText }}))
            break;      
            case 'lastName':
                errorText = this.lastNameCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, lastName: errorText }}))
            break;
            case 'postCode':
                errorText = this.postCodeCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, postCode: errorText }}))
            break;
            case 'phoneNumber':
                errorText = this.phoneCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, phone: errorText }}))
            break;
            default:
            break;
        }
      }

    handleBlur = e => this.handleValidations(e.target.name, e.target.value);

    render() {

        return (
            <div className={s.shippingInfoContainer}>
                <h3 className={`header-sm`}>Shipping Info</h3>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th><label className={s.labelWidth}>Address Title</label></th>
                            <td>
                                <select onChange={this.handleInputData} name="addressTitle" id="addressTitle">
                                    <option value="" disabled selected>Select</option>,
                                    <option value="residence" defaultChecked>Residence</option>
                                    <option value="business">Business</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>First Name</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="firstName" id="firstName" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Last Name</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="lastName" id="lastName" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Your Address</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="address" id="address" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Zip Code</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="number" name="postCode" id="postCode" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Country</label></th>
                            <td>
                                <select onChange={this.handleInputData} name="country" id="country">
                                {countryList}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>City/Town</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="cityTown" id="cityTown" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>State/Province</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="text" name="stateProvince" id="stateProvince" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Phone</label></th>
                            <td><input onBlur={this.handleBlur} onChange={this.handleInputData} type="tel" name="phoneNumber" id="phoneNumber" maxLength='14' value={this.state.phoneNumber} autoComplete='off'/></td>
                        </tr>
                    </tbody>
                </table>
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