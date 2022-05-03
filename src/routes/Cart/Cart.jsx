import React from 'react';
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
    // there are probably easier ways to do this.
    // but in the interest of keeping the cart object pure, and not wanting to send data up from the CartItem components, we will have to fetch the prices from the database.
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
        </div>
    );
};

export default Cart;
