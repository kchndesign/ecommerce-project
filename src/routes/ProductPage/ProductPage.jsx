import Description from './Description';
import VariantButtons from './VariantButtons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';
import { getProduct } from '../../server/server';
import { Link } from 'react-router-dom';
import useImageLoaded from '../../hooks/useImageLoaded';
import useFavouritedItem from '../../hooks/useFavouritedItem';

const ProductPage = (props) => {
    const [currentProductData, setCurrentProductData] = useState(
        {}
    );

    const [imageStyles, imageLoaded] = useImageLoaded();

    const urlParams = useParams();

    // *********************
    // INITIAL DATA FETCH
    // *********************
    useEffect(() => {
        async function initCurrentProductData() {
            const data = await getProduct(
                urlParams.category,
                urlParams
            );
            setCurrentVariant(data.variants[0]);
            setCurrentProductData(data);
        }
        initCurrentProductData();
    }, []);

    // ************************
    // VARIANT STATE MANAGEMENT
    // ************************
    const [currentVariant, setCurrentVariant] = useState('');
    // change variation to the variation of the button that was clicked
    const variantButtonClicked = (e) => {
        setCurrentVariant(e.target.innerText);
    };

    // ***********************
    // FAVOURITES STATE MANAGEMENT
    // ***********************
    const {
        isFavourite,
        pushFavouritedItem,
        removeFavouritedItem,
    } = useFavouritedItem(urlParams.id);

    // on favourite
    const handleOnFavourite = () => {
        pushFavouritedItem(currentProductData.id);
    };

    // on remove favourite
    const handleRemoveFavourite = () => {
        removeFavouritedItem(currentProductData.id);
    };

    return (
        <div className={Styles.ProductPage}>
            {/* BREADCRUMBS */}
            {/* breadcrumbs film > film_product for example */}

            <p className={Styles.ProductPage__breadcrumb}>
                <Link to={`/${urlParams.category}`}>
                    {urlParams.category.charAt(0).toUpperCase() +
                        urlParams.category.slice(1)}
                </Link>{' '}
                &gt;{' '}
                <Link
                    to={`/${urlParams.category}/${urlParams.id}`}
                >
                    {currentProductData.title || (
                        <Skeleton inline={true} width="5rem" />
                    )}
                </Link>
            </p>

            {/* container allows side by side on desktop sized windows */}

            <div className={Styles.ProductPage__container}>
                {/* IMAGE CONTAINER */}
                {/* Initially: image display: none, skeleton display: block */}
                {/* when image loads, the styles swap so that the image is displayed */}

                {/* Image also changes when the variant changes. Will search the images object for the variant key and retrieves the value which is a link to an image. */}

                <div className={Styles.ProductPage__image}>
                    <img
                        src={
                            currentProductData.images?.[
                                currentVariant
                            ]
                        }
                        onLoad={imageLoaded}
                        style={imageStyles.imgStyle}
                        alt={currentProductData.title}
                    />
                    <Skeleton
                        style={imageStyles.skeleStyle}
                        className={
                            Styles.ProductPage__imagePlaceholder
                        }
                    />
                </div>

                {/* product info container for title, price, description, quantity and buttons */}

                <div className={Styles.ProductPage__info}>
                    {/* TITLE */}

                    <h2 className={Styles.ProductPage__title}>
                        {currentProductData.title || (
                            <Skeleton />
                        )}
                    </h2>

                    {/* PRICE */}

                    <p className={Styles.ProductPage__price}>
                        {currentProductData?.price ? (
                            `$${currentProductData.price}`
                        ) : (
                            <Skeleton />
                        )}
                    </p>

                    {/* DESCRIPION */}
                    {/* description in a seperate component: renders a list of paragraphs delineated by \n in the data */}

                    <Description
                        currentProductData={currentProductData}
                    />

                    {/* VARIANT BUTTONS */}
                    {/* variant buttons component renders a list of buttons as per the array of variants in the data. Each variant will have a corresponding image */}

                    <VariantButtons
                        currentVariant={currentVariant}
                        variantButtonClicked={
                            variantButtonClicked
                        }
                        currentProductData={currentProductData}
                    />

                    {/* QUANTITY */}
                    {/* some logic here to differentiate between out of stock and in stock */}

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

                    {/* FAVOURITE BUTTONS */}
                    {/* swap out buttons if the product is favourited or not */}
                    {/* each button references its corresponding click handler function */}

                    {!isFavourite ? (
                        <button
                            className={
                                Styles.ProductPage__favButton
                            }
                            onClick={handleOnFavourite}
                        >
                            favourite this product
                        </button>
                    ) : (
                        <button
                            className={
                                Styles.ProductPage__favButton
                            }
                            onClick={handleRemoveFavourite}
                        >
                            unfavourite this product
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
