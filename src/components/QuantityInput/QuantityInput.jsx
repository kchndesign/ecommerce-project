import React from 'react';
import Styles from './QuantityInput.module.scss';
import Arrow from '../../img/arrow.svg';

const QuantityInput = (props) => {
    return (
        <div className={Styles.QuantityInput}>
            <label htmlFor="number">
                <strong>Quantity</strong>
            </label>
            <div className={Styles.QuantityInput__inputContainer}>
                <button onClick={props.handleDecrement}>
                    <img src={Arrow} alt="cart quantity minus one" />
                </button>
                <input
                    type="number"
                    id="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={props.value}
                    onChange={props.onInput}
                    invalid={props.invalid}
                />
                <button onClick={props.handleIncrement}>
                    <img src={Arrow} alt="cart quantity plus one" />
                </button>
            </div>
        </div>
    );
};

export default QuantityInput;
