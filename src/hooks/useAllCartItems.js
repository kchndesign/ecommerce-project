// =====================================
// useAllCartItems
// this abstracts the logic needed for the cart page.
// =====================================

import { useState } from 'react';

// INITIAL CHECK
// this is necessary to avoid errors in the case that the user navigates to the cart page without the cart entry existing in localStorage.
// we will check if the entry exists, and if not, setItem with an empty array,

// getAllItems
// is a helper function that will return all of the items in the cart as an array.

// updateCartItem
// is a function that will take a changed object that is already in the cart array.
// it will search the array for the object with the same product id and replace it with the new object.

// removeCartItem
// is a function that will take an ID and remove the matching object from the array.

const useAllCartItems = () => {
    // INITIAL CHECK
    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // get all items
    // helper function that returns all of the items from the cart as an array

    const getAllItems = () => {
        return JSON.parse(localStorage.getItem('cart'));
    };

    // initialise state with current cart items

    const [cartItems, setCartItems] = useState(getAllItems());

    // update cart item
    // get items as an array.
    // map through the array and replace where productIds match
    // setItem on new array.
    // update state

    const updateCartItem = (cartObject) => {
        const currentCart = getAllItems();

        const newCart = currentCart.map((obj) => {
            return cartObject.productId === obj.productId ? cartObject : obj;
        });

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(getAllItems());
    };

    // remove cart item
    // get items as an array
    // filter into new array to exclude matching productId
    // setItem on the new array
    // update state

    const removeCartItem = (id) => {
        const currentCart = getAllItems();

        const newCart = currentCart.filter((obj) => {
            return obj.productId !== id;
        });

        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(getAllItems());
    };

    return [cartItems, updateCartItem, removeCartItem];
};

export default useAllCartItems;
