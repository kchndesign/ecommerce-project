import React from 'react';
import Styles from './CardContainer.module.scss';

const CardContainer = (props) => {
    return (
        <div className={Styles.CardContainer}>{props.children}</div>
    );
};

export default CardContainer;
