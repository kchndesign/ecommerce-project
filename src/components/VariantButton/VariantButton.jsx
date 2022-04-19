import React from 'react';
import Styles from './VariantButton.module.scss';

export function VariantButton({
    variant,
    variantButtonClicked,
    isActive,
}) {
    return (
        <button
            key={variant}
            onClick={(e) => variantButtonClicked(e)}
            className={`${Styles.VariantButton} ${
                isActive ? Styles.VariantButton__active : ''
            }`}
        >
            {variant}
        </button>
    );
}
