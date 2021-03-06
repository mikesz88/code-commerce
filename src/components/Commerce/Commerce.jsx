import React from 'react';
import Header from '../Header/Header';
import CodeItemsForSale from '../StoreDisplay/CodeItemsForSale';
import Login from '../Login/Login';
import Cart from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment';
import { stateComponents } from '../JS/stateLogin';
import Confirmed from '../Confirmed/Confirmed';

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

      updateLogin = (state, func) => this.updateSubState('commerceComponents', 'login', state, func);
      updateCart = (state, func) => this.updateSubState('commerceComponents', 'cart', state, func);
      updatePayment = (state, func) => this.updateSubState('commerceComponents', 'payment', state, func);
      updateShipping = (state, func) => this.updateSubState('commerceComponents', 'shipping', state, func);
      updateStoreDisplay = (state, func) => this.updateSubState('commerceComponents', 'storeDisplay', state, func);
      updateConfirmed = (state, func) => this.updateSubState('commerceComponents', 'confirmed', state, func);
      updateCurrentUser = (state, func) => this.updateState('currentUser', state, func);
      updateUserList = (state, func) => this.updateState('users', state, func);
      deleteCartItem = name => this.deleteStateVariable('commerceComponents', 'cart', name);
      deletePaymentItem = name => this.deleteStateVariable('commerceComponents', 'payment', name);
      
      resetState = () => {
          this.setState({
              commerceComponents: stateComponents.commerceComponents
          })
      }


    render() {
        const {storeDisplay, login, cart, shipping, payment, confirmed } = this.state.commerceComponents;
        const { users, currentUser} = this.state;

        return(
            <div>
                <Header />
                {storeDisplay.display 
                && <CodeItemsForSale
                    codeItems={storeDisplay.items}
                    cart={cart}
                    payment={payment}
                    currentUser={currentUser}
                    updateLogin={this.updateLogin}
                    updateCart={this.updateCart}
                    updatePayment={this.updatePayment}
                    updateStoreDisplay={this.updateStoreDisplay}
                    updateCurrentUser={this.updateCurrentUser}
                    deleteCartItem={this.deleteCartItem}
                    deletePaymentItem={this.deletePaymentItem}
                />}
                {login.display 
                && <Login 
                    users={users}
                    updateLogin={this.updateLogin}
                    updateCart={this.updateCart}
                    updateCurrentUser={this.updateCurrentUser}
                    updateUserList={this.updateUserList}
                    updateStoreDisplay={this.updateStoreDisplay}
                />}
                {cart.display 
                && <Cart 
                    cart={cart}
                    payment={payment}
                    updateCart={this.updateCart}
                    updateStoreDisplay={this.updateStoreDisplay}
                    updatePayment={this.updatePayment}
                    updateShipping={this.updateShipping}
                    deleteCartItem={this.deleteCartItem}
                    deletePaymentItem={this.deletePaymentItem}
                />}
                {shipping.display 
                && <Shipping
                    cart={cart}
                    payment={payment}
                    shipping={shipping}
                    updateCart={this.updateCart}
                    updatePayment={this.updatePayment}
                    updateStoreDisplay={this.updateStoreDisplay}
                    updateShipping={this.updateShipping}
                />}
                {payment.display 
                && <Payment
                    cart={cart}
                    payment={payment}
                    shipping={shipping}
                    currentUser={currentUser} 
                    updateCart={this.updateCart}
                    updatePayment={this.updatePayment}
                    updateStoreDisplay={this.updateStoreDisplay}
                    updateShipping={this.updateShipping}
                    updateConfirmed={this.updateConfirmed}
                    updateCurrentUser={this.updateCurrentUser}
                />}
                {confirmed.display 
                && <Confirmed 
                    cart={cart}
                    payment={payment}
                    shipping={shipping}
                    updateStoreDisplay={this.updateStoreDisplay}
                    updateConfirmed={this.updateConfirmed}
                    resetState={this.resetState}
                />}
            </div>
        )
    }
}

export default Commerce;