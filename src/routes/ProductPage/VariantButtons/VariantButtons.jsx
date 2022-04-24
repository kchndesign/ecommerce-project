import React from 'react';
import VariantButton from '../VariantButton';
import Skeleton from 'react-loading-skeleton';

export function VariantButtons({
    currentVariant,
    variantButtonClicked,
    currentProductData,
}) {
    return (
        <React.Fragment>
            {currentVariant ? (
                currentProductData.variants.map((variant) => {
                    return (
                        <VariantButton
                            variant={variant}
                            variantButtonClicked={
                                variantButtonClicked
                            }
                            isActive={
                                variant === currentVariant
                                    ? true
                                    : false
                            }
                            key={variant}
                        />
                    );
                })
            ) : (
                <React.Fragment>
                    <Skeleton width="100px" height="40px" />
                    <Skeleton width="100px" height="40px" />
                    <Skeleton width="100px" height="40px" />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
