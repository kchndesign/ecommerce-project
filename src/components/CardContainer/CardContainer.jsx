import React from 'react';
import Styles from './CardContainer.module.scss';

const CardContainer = (props) => {
    return (
        <div className={Styles.CardContainer}>
            {props.children.length > 0 ? (
                props.children
            ) : (
                <div
                    className={Styles.CardContainer__placeholder}
                >
                    <p>Nothing here.</p>
                </div>
            )}
        </div>
    );
};

export default CardContainer;
