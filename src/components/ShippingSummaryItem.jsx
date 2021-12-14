import React from "react";
import s from '../components/ShippingSummaryItem.module.css';

class ShippingSummaryItem extends React.Component {
    render() {
        const { name, img, file, cartItemQty, priceWithQty } = this.props
        return (
            <div className={s.flexBox}>
                <div className={`${s.imgContainer}`}>
                    <img src={img} alt='code logo' />
                </div>
                <div className={s.textBox}>
                    <p className={`${s.bottomPadding} ${s.smallFont}`}><strong>{name}</strong></p>
                    <div className={s.smallFont}>File Size: {file}</div>
                    <div className={`${s.flexPriceDiv} ${s.smallFont}`}>
                        <span>Qty: {cartItemQty}</span>
                        <span>Price: {priceWithQty}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default ShippingSummaryItem;