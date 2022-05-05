import React, { useEffect, useState } from 'react';
import useAllCartItems from '../../hooks/useAllCartItems';
import Styles from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import { checkoutProduct } from '../../server/server';

const Cart = () => {
    // ============================
    // SETUP USE ALL CART ITEMS HOOK
    // ============================

    const [cartItems, updateCartItem, removeCartItem, clearCartItems] =
        useAllCartItems();

    // =================================
    // SETUP PRICE TOTALLING
    // =================================

    const [totalPrice, setTotalPrice] = useState();

    // when the cart items change, we loop through the array and total the total prices.
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            return acc + item.totalPrice;
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    // =================================
    // HANDLE CHECKOUT CART
    // this function needs to mutate the database and subtract the quantity of items the user has chosen
    // map through the cartItems state array and for each product, call checkoutProduct() and return an array of promises.
    // at the end clear cart.
    // =================================

    const handleCheckoutCart = async () => {
        if (cartItems.length === 0) {
            return;
        }

        const promiseArr = cartItems.map((item) => {
            return checkoutProduct(
                item.category,
                item.productId,
                item.currentQuantity
            );
        });

        await Promise.all(promiseArr);
        clearCartItems();
    };

    // =================================
    // START MARKUP
    // =================================

    return (
        <>
            {/* Title */}
            <h1 className={Styles.Cart__h1}>Your Shopping Cart</h1>

            {/* List of cart items */}
            <div>
                {cartItems.map((product) => {
                    return (
                        <CartItem
                            cartItem={product}
                            key={product.productId}
                            // each item will call these functions since they know what product they have.
                            updateCartItem={updateCartItem}
                            removeCartItem={removeCartItem}
                        />
                    );
                })}
                {cartItems.length === 0 ? 'Nothing here.' : null}
            </div>

            {/* Cart summary with total price etc */}
            <div className={Styles.Cart__summary}>
                {/* Title */}
                <h3 className={Styles.Cart__summary__title}>Cart Summary</h3>
                <table>
                    <tbody>
                        {/* subtotal */}
                        <tr>
                            <td>
                                <p>Subtotal:</p>
                            </td>
                            <td>
                                <p>
                                    {totalPrice === 0
                                        ? null
                                        : '$' + totalPrice?.toFixed(2)}
                                </p>
                            </td>
                        </tr>
                        {/* GST */}
                        <tr>
                            <td>
                                <p>GST:</p>
                            </td>
                            <td>
                                <p>
                                    {totalPrice === 0
                                        ? null
                                        : '$' + (totalPrice * 0.1).toFixed(2)}
                                </p>
                            </td>
                        </tr>
                        {/* total total price */}
                        <tr>
                            <td></td>
                            <td className={Styles.Cart__summary__total}>
                                <p>
                                    <strong>
                                        {totalPrice === 0
                                            ? null
                                            : '$' + totalPrice?.toFixed(2)}
                                    </strong>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Checkout button */}
                <button
                    className={Styles.Cart__summary__checkout}
                    onClick={handleCheckoutCart}
                >
                    Checkout
                </button>
                <p>Note: this will mutate the database.</p>
            </div>
        </>
    );
};

export default Cart;
