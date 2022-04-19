import VariantButton from '../../components/VariantButton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';
import { getProduct } from '../../server/server';

const ProductPage = (props) => {
    const [currentProductData, setCurrentProductData] = useState({});
    const [currentVariant, setCurrentVariant] = useState('');

    const urlParam = useParams();

    const [imageStyles, setImageStyles] = useState({
        imgStyle: {
            display: 'none',
        },
        skeleStyle: {
            display: 'block',
        },
    });

    const imageLoaded = () => {
        setImageStyles({
            imgStyle: {
                display: 'block',
            },
            skeleStyle: {
                display: 'none',
            },
        });
    };

    async function initCurrentProductData() {
        const data = await getProduct('film', urlParam);
        setCurrentVariant(data.variants[0]);
        setCurrentProductData(data);
    }

    useEffect(() => {
        initCurrentProductData();
    }, []);

    const variantButtonClicked = (e) => {
        setCurrentVariant(e.target.innerText);
    };

    return (
        <div className={Styles.ProductPage}>
            <div className={Styles.ProductPage__container}>
                <div className={Styles.ProductPage__image}>
                    <img
                        src={
                            currentProductData.images?.[
                                currentVariant
                            ]
                        }
                        onLoad={imageLoaded}
                        style={imageStyles.imgStyle}
                    />
                    <Skeleton
                        style={imageStyles.skeleStyle}
                        className={
                            Styles.ProductPage__imagePlaceholder
                        }
                    />
                </div>
                <div className={Styles.ProductPage__info}>
                    <h2 className={Styles.ProductPage__title}>
                        {currentProductData.title || <Skeleton />}
                    </h2>
                    <p className={Styles.ProductPage__price}>
                        {currentProductData?.price ? (
                            `$${currentProductData.price}`
                        ) : (
                            <Skeleton />
                        )}
                    </p>

                    <p className={Styles.ProductPage__desc}>
                        {currentProductData?.desc || (
                            <Skeleton count={5} />
                        )}
                    </p>

                    {currentVariant ? (
                        currentProductData.variants.map((variant) => {
                            return (
                                <VariantButton
                                    variant={variant}
                                    variantButtonClicked={
                                        variantButtonClicked
                                    }
                                    isActive={
                                        variant == currentVariant
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

                    <p className={Styles.ProductPage__quantity}>
                        {currentProductData?.quantity != null ? (
                            currentProductData.quantity > 0 ? (
                                <>
                                    <strong>In Stock: </strong>
                                    {currentProductData.quantity} left
                                </>
                            ) : (
                                <strong>Out of stock</strong>
                            )
                        ) : (
                            <Skeleton />
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
