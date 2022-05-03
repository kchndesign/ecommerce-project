import React, { useEffect, useState } from 'react';
import useAllCartItems from '../../hooks/useAllCartItems';
import Styles from './Cart.module.scss';
import CartItem from './CartItem/CartItem';

const Cart = () => {
    // ============================
    // SETUP USE ALL CART ITEMS HOOK
    // ============================

    const [cartItems, updateCartItem, removeCartItem] = useAllCartItems();

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
    // START MARKUP
    // =================================

    return (
        <div className={Styles.Cart}>
            <h1>Your Shopping Cart</h1>

            <div className={Styles.Cart__itemsContainer}>
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
            </div>
            <h3>{totalPrice}</h3>
        </div>
    );
};

export default Cart;
