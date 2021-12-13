import React from 'react';
import s from '../components/ShippingForm.module.css';
import { countryList } from './stateLogin';


class ShippingForm extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {};
    }

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
                                <select name="addressTitle" id="addressTitle">
                                    <option value="residence" defaultChecked>Residence</option>
                                    <option value="business">Business</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>First Name</label></th>
                            <td><input type="text" name="firstName" id="firstName" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Last Name</label></th>
                            <td><input type="text" name="lastName" id="lastName" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Your Address</label></th>
                            <td><input type="text" name="address" id="address" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Zip Code</label></th>
                            <td><input type="number" name="postalCode" id="postalCode" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Country</label></th>
                            <td>
                                <select name="country" id="country">
                                {countryList}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>City/Town</label></th>
                            <td><input type="text" name="cityTown" id="cityTown" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>State/Province</label></th>
                            <td><input type="text" name="stateProvince" id="stateProvince" /></td>
                        </tr>
                        <tr>
                            <th><label className={s.labelWidth}>Phone</label></th>
                            <td><input type="number" name="phoneNumber" id="phoneNumber" /></td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div>
                    <h3 className={`header-sm`}>Shipping Method</h3>
                    <div className={s.flexColumn}>
                        <div>
                            <input type="radio" name="standardDelivery" id="standardDelivery" defaultChecked/>
                            <label>Standard</label>
                            <span>Delivery in 4-6 Business Days - Free ($250 min.)</span>
                        </div>
                        <div>
                            <input type="radio" name="expressDelivery" id="expressDelivery" />
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