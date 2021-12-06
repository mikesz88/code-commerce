import React from 'react';
import Header from './Header';
import CodeItemsForSale from './CodeItemsForSale';
import Login from './Login';
import Cart from './Cart';
import Shipping from './Shipping';
import Payment from './Payment';
import { stateComponents } from './stateLogin';

class Commerce extends React.Component {
    constructor() {
        super();
        this.state = stateComponents;
    }

    updateState = (name, state, func) => {
        this.setState(prevState => ({
            [name]: {
            ...prevState[name],
            ...state
            }
        }), func)
    }

    updateSubState = (name, sub, state, func) => {
        this.setState((prevState) => ({
          [name]: {
            ...prevState[name],
            [sub]: {
                ...prevState[name][sub],
                ...state
            },
          },
        }), func);
      }

      deleteStateVariable = (commerce, name, sub) => {
        this.setState(prevState => {
          const state = { ...prevState };
          delete state[commerce][name][sub];
          return state;
        });
      };

    render() {
        const {storeDisplay, login, cart, shipping, payment } = this.state.commerceComponents;
        const { users } = this.state;

        return(
            <div>
                <Header />
                {storeDisplay.display 
                && <CodeItemsForSale
                    loggedIn={login.loggedIn}
                    loginScreen={login.display}
                    codeItems={storeDisplay.items}
                    cart={cart}
                    updateState={this.updateState} 
                    updateSubState={this.updateSubState}
                    deleteSubState={this.deleteStateVariable}
                />}
                {login.display && <Login 
                    users={users}
                    updateState={this.updateState}
                    updateSubState={this.updateSubState}
                />}
                {cart.display && <Cart />}
                {shipping.display && <Shipping />}
                {payment.display && <Payment />}
            </div>
        )
    }
}

export default Commerce;