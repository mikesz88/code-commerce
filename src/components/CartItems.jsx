import React from 'react';
import s from '../components/CartItems.module.css';

class CartItems extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    render() {
        const { name, img, price, file, linesOfCode } = this.props;
        return (
            <>
                <hr />
                <div className={`cartFlex`}>
                    <div className={`product productFlex`}>
                        <button onClick={this.deleteFromCart}><i className="fas fa-times-circle"></i></button>
                        <div className={`img-container`}>
                            <img src={img} alt="" />
                        </div>
                        <div className={`productInfo`}>
                            <span><strong><u>{name}</u></strong></span>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><span>File Size:</span></th>
                                        <td><span>{file}</span></td>
                                    </tr>
                                    <tr>
                                        <th><span>Lines of Code:</span></th>
                                        <td><span>{linesOfCode}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={`other`}>
                        ${price}
                    </div>

                    <div className={`other`}>
                        <select name="quantity" id="quantity">
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                            <option value="1">4</option>
                            <option value="1">5</option>
                            <option value="1">6</option>
                            <option value="1">7</option>
                            <option value="1">8</option>
                            <option value="1">9</option>
                            <option value="1">10</option>
                        </select>
                    </div>

                    <div className={`other`}>
                        {/* {Number((this.state.quantity * price).toFixed(2))} */}
                        test -&gt; ${price * 2}
                    </div>
                </div>
            </>
        )
    }
}

export default CartItems;