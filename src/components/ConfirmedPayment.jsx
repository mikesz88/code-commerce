import React from "react";
import s from '../components/ConfirmedPayment.module.css';

class ConfirmedPayment extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    updateStoreDisplay = (state, func) => this.props.updatePayment(state, func);
    updateConfirmed = (state, func) => this.props.updateConfirmed(state, func);
    resetState = () => this.props.resetState;

    backToHome = () => {
        this.resetState();
        this.updateConfirmed({display: false});
        this.updateStoreDisplay({display: true});

    }

    render() {
        return (
            <div className={`${s.confirmContainer}`}>
                <h3 className={`header-sm`}>Confirmation</h3>
                <hr />
                <div className={s.flexContainer}>
                    <div className={s.checkContainer}>
                        <i class="far fa-check-circle"></i>
                    </div>
                    <p className={`header-md`}>Congratulations</p>
                    <p className={`header-md`}>Your order is accepted.</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet est placerat in egestas erat.
                    </p>
                    <button className={`btn ${s.trackOrderButton}`} onClick={this.trackOrder}>Track Order</button>
                    <button className={`btn ${s.backToHomeButton}`} onClick={this.backToHome}>Back To Home</button>
                    {/*
                    Circle Check
                    'Congratulations.
                    Your order is accepted.
                    Lorem Ipsum 2 sentences
                    track order button
                    back to home page
                    */}
                </div>
            </div>
        )
    }
}

export default ConfirmedPayment;