import React from 'react';
import s from '../components/CodeItemsForSale.module.css';

class CodeItemsForSale extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    updateCart = (name, value) => {
        this.props.updateSubState('commerceComponents', 'cart', {[name]: value});
    }

    
    render() {
        const { codeItems } = this.props;

        return(
            <div className={s.codeStoreContainer}>
                {Object.keys(codeItems).map(code => (
                    <div className={s.cardContainer}>
                        <h3 className={`header-sm`}>{code}</h3>
                        <img src="" alt="" />
                        <p className={`caption`}>${codeItems[code]}</p>
                        {!Object.keys(this.props.cart).includes(code)
                        ? <button onClick={() => this.updateCart(code, codeItems[code])}>Add to Cart</button>
                        : <button onClick={() => this.props.deleteSubState('commerceComponents', 'cart', code)}>Remove from Cart</button>}
                    </div>
                ))}
                <div>
                    <h3 className={`header-md`}> 
    {/* I am here. I now need to make a condition that if they are not logged in, they cannot do anything until then */}
    {/* Remember to take your time. You are here to understand, not speed through it. */}
    {/* You just accomplished interactive button! */}
                        Click any to add to cart!
                    </h3>
                    <p className={`caption`}>You must log in first before you are able to add to cart!</p>
                </div>
            </div>
        )
    }
}

export default CodeItemsForSale;