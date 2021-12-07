import React from 'react';
import s from '../components/CartHeader.module.css';

class CartHeader extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div className={`cartFlex`}>
               <h3 className={`header-sm product`}>Product</h3> 
               <h3 className={`header-sm other`}>Price</h3> 
               <h3 className={`header-sm other`}>Quantity</h3> 
               <h3 className={`header-sm other`}>Total Price</h3> 
            </div>
        )
    }
}

export default CartHeader;