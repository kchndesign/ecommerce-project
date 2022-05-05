import React from 'react';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import QuantityInput from '../../../components/QuantityInput';
import { getProduct } from '../../../server/server';
import Styles from './CartItem.module.scss';
import useImageLoaded from '../../../hooks/useImageLoaded';
import { Link } from 'react-router-dom';

const CartItem = ({ cartItem, updateCartItem, removeCartItem }) => {
    // =================================
    // SETUP IMAGE PLACEHOLDER STYLES
    // =================================

    const [imageStyles, imageLoaded] = useImageLoaded();

    // =================================
    // INITIAL LOAD
    // load the product data from the server with the productId given.
    // put it into a a state.
    // =================================

    const [currentProduct, setCurrentProduct] = useState({});

    // await product data.
    // set product data to currentProduct
    useEffect(() => {
        async function getData() {
            const data = await getProduct(cartItem.category, {
                id: cartItem.productId,
            });

            setCurrentProduct(data);
        }

        getData();
    }, [cartItem.category, cartItem.productId]);

    // =================================
    // QUANTITY EVENT HANDLERS
    // =================================

    // check that the update will not take the cart quantity out of range of the stock quantity
    // call the update cart item function with the new object to replace the old state
    const handleIncrement = () => {
        if (cartItem.currentQuantity + 1 <= currentProduct.quantity) {
            let newCartObject = {
                ...cartItem,
                currentQuantity: cartItem.currentQuantity + 1,
                totalPrice:
                    cartItem.productPrice * (cartItem.currentQuantity + 1),
            };
            updateCartItem(newCartObject);
        }
    };

    // if the resulting quantity value is greater or equal to 1, decrement the quantity and update the cart item.
    // if the resulting quantity value is equal to 0, call the remove function.
    const handleDecrement = () => {
        if (cartItem.currentQuantity - 1 >= 1) {
            let newCartObject = {
                ...cartItem,
                currentQuantity: cartItem.currentQuantity - 1,
                totalPrice:
                    cartItem.productPrice * (cartItem.currentQuantity - 1),
            };
            updateCartItem(newCartObject);
        } else if (cartItem.currentQuantity <= 1) {
            removeCartItem(cartItem.productId);
        }
    };

    // check that the resulting value will be in range of the stock quantity
    // call update cart item with new object
    // if the user inputs 0, remove the cart item
    const handleQuantityInput = (e) => {
        if (0 < e.target.value && e.target.value <= currentProduct.quantity) {
            let newCartObject = {
                ...cartItem,
                currentQuantity: parseInt(e.target.value),
                totalPrice: cartItem.productPrice * parseInt(e.target.value),
            };
            updateCartItem(newCartObject);
        } else if (e.target.value === 0) {
            removeCartItem(cartItem.productId);
        }
    };

    // =================================
    // START MARKUP
    // =================================

    return (
        <div className={Styles.CartItem}>
            <Link to={`/${cartItem.category}/${cartItem.productId}`}>
                {/* IMAGE */}
                <img
                    src={currentProduct.images?.thumb}
                    alt={currentProduct.title}
                    className={Styles.CartItem__thumb}
                    onLoad={imageLoaded}
                    style={imageStyles.visibleAfterImageLoads}
                />

                {/* SKELETON */}
                {/* placeholder for image */}
                <Skeleton
                    className={Styles.CartItem__thumb}
                    style={imageStyles.visibleBeforeImageLoads}
                />
            </Link>

            {/* TITLE AND VARIANT */}
            {/* bundled together because of flex box styling */}
            <div
                className={`${Styles.CartItem__contentWrapper} ${Styles.CartItem__contentWrapperTitle}`}
            >
                <Link to={`/${cartItem.category}/${cartItem.productId}`}>
                    <h3>
                        {currentProduct.title || (
                            <Skeleton height="1.5rem" width="7rem" />
                        )}
                    </h3>
                </Link>

                <p>{cartItem.currentVariant}</p>
            </div>

            {/* QUANTITY SELECTOR AND INSTOCK QUANTITY */}
            <div
                className={`${Styles.CartItem__contentWrapper} ${Styles.CartItem__contentWrapperNoShrink}`}
            >
                <QuantityInput
                    value={cartItem.currentQuantity}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    onInput={handleQuantityInput}
                />
                <p>{currentProduct.quantity} left</p>
            </div>

            {/* PRICE */}
            <div
                className={`${Styles.CartItem__contentWrapper} ${Styles.CartItem__contentWrapperNoShrink}`}
            >
                <p>
                    <strong>Item price: </strong>$
                    {currentProduct.price?.toFixed(2)}
                </p>
                <p>
                    <strong>Total Price: </strong>$
                    {cartItem.totalPrice?.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default CartItem;
