import React from 'react';
import useAllCartItems from '../../hooks/useAllCartItems';
import Styles from './Cart.module.scss';
import CartItem from './CartItem/CartItem';

const Cart = () => {
    const [cartItems, updateCartItem, removeCartItem] = useAllCartItems();

    return (
        <div className={Styles.Cart}>
            <h1>Your Shopping Cart</h1>

            <div className={Styles.Cart__itemsContainer}>
                {cartItems.map((product) => {
                    return (
                        <CartItem product={product} key={product.productId} />
                    );
                })}
            </div>
        </div>
    );
};

export default Cart;
