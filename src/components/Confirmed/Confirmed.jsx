import React from "react";
import s from '../Confirmed/Confirmed.module.css';
import ConfirmedPayment from "../Confirmed/ConfirmedPayment";
import ConfirmedSummary from "../Confirmed/ConfirmedSummary";
import ProgressBar from '../ProgressBar/Progress-bar';


class Confirmed extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        const { payment, cart, shipping } = this.props;

        return (
            <>
                <ProgressBar 
                    key={4}
                    completed={100}
                />
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
            </>
        )
    }
}

export default Confirmed;