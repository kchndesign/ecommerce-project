import React from 'react';
import Arrow from '../../../arrow.svg';
import Styles from './ArrowButton.module.scss';

function ArrowButton(props) {
    return (
        <div
            className={
                `${Styles.ArrowButton} ` +
                (props.isLeft
                    ? Styles.ArrowButtonLeft
                    : Styles.ArrowButtonRight)
            }
            onClick={props.isLeft ? props.prev : props.next}
        >
            <img
                src={Arrow}
                alt={props.isLeft ? 'previous slide' : 'next slide'}
                aria-controls={props.controls}
            />
        </div>
    );
}

export default ArrowButton;
