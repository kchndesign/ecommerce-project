import Description from './Description';
import VariantButtons from './VariantButtons';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';
import { getProduct } from '../../server/server';
import { Link } from 'react-router-dom';
import useImageLoaded from '../../hooks/useImageLoaded';
import useFavouritedItem from '../../hooks/useFavouritedItem';
import QuantityInput from '../../components/QuantityInput';
import useAddToCart from '../../hooks/useAddToCart';

// This reducer is used to manage the cart object "currentSelections" that might be sent to the cart when the user presses add to cart.

// the cart object needs to contain:
// the current variant selected
// the quantity of the order
// the product id
// the product category
// the product price
// the total cost of the selected variants and quantity

// Unfortunately, the last two are necessary for us to calculate the cart total from the cart page.

// The currentSelections will also serve as the state for the object to be used by elements on the page. e.g. the current variants will be used by the variant buttons and the image.

// REDUCER FUNCTION
// reducer allows us to set variant and set quantity with a dispatch function
const reducer = (state, action) => {
    switch (action.type) {
        case 'setCurrentVariant':
            return { ...state, currentVariant: action.payload };
        case 'setCurrentQuantity':
            return {
                ...state,
                currentQuantity: action.payload,
                totalPrice: state.productPrice * action.payload,
            };
        case 'setProductPrice':
            return {
                ...state,
                productPrice: action.payload,
                totalPrice: state.currentQuantity * action.payload,
            };
        default:
            throw new Error();
    }
};

const ProductPage = () => {
    // =================================
    // setting up PRODUCT DATA STATE
    // this is the state that will hold the fetched product data
    // not to be confused with the currentSelections object to be sent to the cart
    // =================================

    const [currentProductData, setCurrentProductData] = useState({});

    // =================================
    // Setting up our URL PARAMETERS
    // =================================

    const urlParams = useParams();

    // ==================================
    // Setting up our reducer function for the cart object
    // ==================================

    // we need to make sure that the product id is present in the cart object
    const initialState = {
        currentVariant: '',
        currentQuantity: 1,
        productPrice: 0,
        totalPrice: 0,
        productId: urlParams.id,
        category: urlParams.category,
    };

    const [currentSelections, dispatch] = useReducer(reducer, initialState);

    // =================================
    // CHANGE CART OBJECT QUANTITY
    // according to inputs from the QuantityInput components
    // =================================

    // check if the input will be in range
    // then set the state (which will be bound to the input value)
    const handleQuantityPlus = () => {
        if (currentSelections.currentQuantity < currentProductData?.quantity) {
            console.log(currentSelections.currentQuantity);
            dispatch({
                type: 'setCurrentQuantity',
                payload: currentSelections.currentQuantity + 1,
            });
        }
    };

    const handleQuantityMinus = () => {
        if (currentSelections.currentQuantity > 1) {
            dispatch({
                type: 'setCurrentQuantity',
                payload: currentSelections.currentQuantity - 1,
            });
        }
    };

    // if the user types into the quantity input,
    // check if the input is in range
    // then set the state
    const handleQuantityInput = (event) => {
        if (
            1 <= event.target.value &&
            event.target.value <= currentProductData?.quantity
        ) {
            dispatch({
                type: 'setCurrentQuantity',
                payload: parseInt(event.target.value),
            });
        }
    };

    // =================================
    // CHANGE SELECTED VARIANT
    // =================================

    // event handler for the variant buttons, we will change the selection on our cart object
    const variantButtonClicked = (e) => {
        dispatch({
            type: 'setCurrentVariant',
            payload: e.target.innerText,
        });
    };

    // =================================
    // Setting up our image styles hook
    // this allows us to swap a skeleton placeholder for an actual image once it is loaded
    // =================================

    const [imageStyles, imageLoaded] = useImageLoaded();

    // =================================
    // Setting up our favourites hook and event handlers
    // =================================

    const { isFavourite, pushFavouritedItem, removeFavouritedItem } =
        useFavouritedItem(urlParams.id);

    // on favourite
    const handleOnFavourite = () => {
        pushFavouritedItem(currentProductData.id);
    };

    // on remove favourite
    const handleRemoveFavourite = () => {
        removeFavouritedItem(currentProductData.id);
    };

    // =================================
    // ADD TO CART
    // =================================

    const [isAddedToCart, addProductToCart] = useAddToCart(urlParams.id);

    // event handler for adding to cart
    // call the add to cart function with the users selections
    const handleOnAddCart = () => {
        addProductToCart(currentSelections);
    };

    // =================================
    // INITIAL DATA FETCH
    // put the data into the currentProductData state
    // =================================

    // await product data
    // dispatch current variant arbitrarily to the first in the array
    // populate cart object with the product's price
    // then set the current product data

    useEffect(() => {
        async function initCurrentProductData() {
            const data = await getProduct(urlParams.category, urlParams);

            dispatch({
                type: 'setCurrentVariant',
                payload: data.variants[0],
            });

            dispatch({
                type: 'setProductPrice',
                payload: data.price,
            });

            setCurrentProductData(data);
        }
        initCurrentProductData();
    }, []);

    // =================================
    // START MARKUP
    // =================================

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
                <Link to={`/${urlParams.category}/${urlParams.id}`}>
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
                                currentSelections?.currentVariant
                            ]
                        }
                        onLoad={imageLoaded}
                        style={imageStyles.visibleAfterImageLoads}
                        alt={currentProductData.title}
                    />
                    <Skeleton
                        style={imageStyles.visibleBeforeImageLoads}
                        className={Styles.ProductPage__imagePlaceholder}
                    />
                </div>

                {/* product info container for title, price, description, quantity and buttons */}

                <div className={Styles.ProductPage__info}>
                    {/* TITLE */}

                    <h2 className={Styles.ProductPage__title}>
                        {currentProductData.title || <Skeleton />}
                    </h2>

                    {/* PRICE */}

                    <p className={Styles.ProductPage__price}>
                        {currentProductData?.price ? (
                            `$${currentProductData.price?.toFixed(2)}`
                        ) : (
                            <Skeleton />
                        )}
                    </p>

                    {/* DESCRIPION */}
                    {/* description in a seperate component: renders a list of paragraphs delineated by \n in the data */}

                    <Description currentProductData={currentProductData} />

                    {/* ITEM OUT OF STOCK? */}
                    {/* render none of this except an out of stock message */}
                    {currentProductData.quantity > 0 ? (
                        <>
                            {' '}
                            <hr />
                            {/* VARIANT BUTTONS */}
                            {/* variant buttons component renders a list of buttons as per the array of variants in the data. Each variant will have a corresponding image */}
                            <VariantButtons
                                currentVariant={
                                    currentSelections?.currentVariant
                                }
                                variantButtonClicked={variantButtonClicked}
                                currentProductData={currentProductData}
                            />
                            {/* QUANTITY INPUT */}
                            {/* input the quantity for the add to cart functionality */}
                            <QuantityInput
                                value={currentSelections.currentQuantity}
                                handleIncrement={handleQuantityPlus}
                                handleDecrement={handleQuantityMinus}
                                onInput={handleQuantityInput}
                            />
                            {/* QUANTITY TEXT */}
                            {/* some logic is required because we want to replace the whole text with a skeleton loader but we have some static 'in stock' text at the same time */}
                            <p className={Styles.ProductPage__quantity}>
                                {currentProductData ? (
                                    <>
                                        <strong>In stock: </strong>{' '}
                                        {currentProductData?.quantity} left
                                    </>
                                ) : (
                                    <Skeleton />
                                )}
                            </p>
                            {/* TOTAL PRICE TEXT */}
                            <p>
                                <strong>Total Price</strong>: $
                                {currentSelections.totalPrice?.toFixed(2)}
                            </p>
                            {/* ADD TO CART BUTTON */}
                            <button
                                className={Styles.ProductPage__favButton}
                                onClick={handleOnAddCart}>
                                Add to cart
                            </button>
                            <hr />
                        </>
                    ) : (
                        <p className={Styles.ProductPage__quantity}>
                            <strong>Out of stock</strong>
                        </p>
                    )}
                    {/* FAVOURITE BUTTONS */}
                    {/* swap out buttons if the product is favourited or not */}
                    {/* each button references its corresponding click handler function */}

                    {!isFavourite ? (
                        <button
                            className={Styles.ProductPage__favButton}
                            onClick={handleOnFavourite}>
                            favourite this product
                        </button>
                    ) : (
                        <button
                            className={Styles.ProductPage__favButton}
                            onClick={handleRemoveFavourite}>
                            unfavourite this product
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
