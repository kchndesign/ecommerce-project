import React from 'react';
import Styles from '../ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';

export function Description({ currentProductData, desc }) {
    return (
        <section
            aria-label="description"
            className={Styles.ProductPage__desc}
        >
            {currentProductData?.desc ? (
                currentProductData.desc
                    .split(/\\n/)
                    .map((para, index) => {
                        return <p key={index}>{para}</p>;
                    })
            ) : (
                <Skeleton count={5} />
            )}
        </section>
    );
}
