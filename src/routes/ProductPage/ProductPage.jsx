import Description from './Description';
import VariantButtons from './VariantButtons';
import VariantButton from './VariantButton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';
import { getProduct } from '../../server/server';
import { Link } from 'react-router-dom';
import useImageLoaded from '../../hooks/useImageLoaded';

const ProductPage = (props) => {
    const [currentProductData, setCurrentProductData] = useState(
        {},
    );
    const [currentVariant, setCurrentVariant] = useState('');

    const [imageStyles, imageLoaded] = useImageLoaded();

    const urlParams = useParams();

    // initial data fetch
    useEffect(() => {
        async function initCurrentProductData() {
            const data = await getProduct(
                urlParams.category,
                urlParams,
            );
            setCurrentVariant(data.variants[0]);
            setCurrentProductData(data);
        }
        initCurrentProductData();
    }, []);

    // change variation to the variation of the button that was clicked
    const variantButtonClicked = (e) => {
        setCurrentVariant(e.target.innerText);
    };

    return (
        <div className={Styles.ProductPage}>
            <p className={Styles.ProductPage__breadcrumb}>
                <Link to={`/${urlParams.category}`}>
                    {urlParams.category.charAt(0).toUpperCase() +
                        urlParams.category.slice(1)}
                </Link>{' '}
                &gt;{' '}
                <Link
                    to={`/${urlParams.category}/${urlParams.id}`}>
                    {currentProductData.title || (
                        <Skeleton inline={true} width="5rem" />
                    )}
                </Link>
            </p>
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
                        {currentProductData.title || (
                            <Skeleton />
                        )}
                    </h2>
                    <p className={Styles.ProductPage__price}>
                        {currentProductData?.price ? (
                            `$${currentProductData.price}`
                        ) : (
                            <Skeleton />
                        )}
                    </p>

                    <Description
                        currentProductData={currentProductData}
                    />

                    <VariantButtons
                        currentVariant={currentVariant}
                        variantButtonClicked={
                            variantButtonClicked
                        }
                        currentProductData={currentProductData}
                    />

                    <p className={Styles.ProductPage__quantity}>
                        {currentProductData?.quantity != null ? (
                            currentProductData.quantity > 0 ? (
                                <>
                                    <strong>In Stock: </strong>
                                    {
                                        currentProductData.quantity
                                    }{' '}
                                    left
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
