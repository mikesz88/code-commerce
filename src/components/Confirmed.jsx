import React from "react";
import s from '../components/Confirmed.module.css';
import ConfirmedPayment from "./ConfirmedPayment";
import ConfirmedSummary from "./ConfirmedSummary";

class Confirmed extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        const { payment, cart, shipping } = this.props;

        return (
            <div className={`container ${s.gridContainer}`}>
                <ConfirmedPayment
                    updateStoreDisplay={this.props.updateStoreDisplay}
                    updateConfirmed={this.props.updateConfirmed}
                    resetState={this.props.resetState}
                />
                <ConfirmedSummary
                    cart={cart}
                    payment={payment}
                    shipping={shipping} 
                />
            </div>
        )
    }
}

export default Confirmed;