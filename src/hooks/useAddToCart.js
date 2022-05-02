// I am now addicted to using custom hooks...
// this is to use localstorage to save a single product into an array of product ids in localstorage.

// INITIAL CHECK
// every time this hook is used, we need to make sure there is at least an empty cart object in the localstorage to avoid null errors.

// CHECK IF THE PRODUCT HAS BEEN ADDED TO CART
// Use a isAddedToCart state to tell the product whether it is already in the cart.

// addProductToCart()
// generate an object that contains the product id, the quantity added to the cart and the variant.

import { useState } from 'react';

const useAddToCart = (productId) => {
    // =================================
    // INITIAL CHECK FOR CART OBJECT
    // if localStorage returns null for the cart entry, replace with empty array.
    // =================================

    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // =================================
    // INITIALISE STATE
    // this will be a boolean that will tell the product whether it is in the cart.
    // =================================

    // helper function that can be called when we want to update the isAddedToCart state.
    // Using the localStorage as a single source of truth.

    const getIsAddedToCart = () => {
        return JSON.parse(localStorage.getItem('cart')).some(
            (product) => product.productId === productId
        );
    };

    const [isAddedToCart, setIsAddedToCart] = useState(getIsAddedToCart());

    // =================================
    // ADD PRODUCT TO CART
    // check if product is already in the cart
    // if not, push the cart object into the array and setItem
    // =================================

    const addProductToCart = (cartObject) => {
        if (getIsAddedToCart()) {
            console.error('Tried to add product that was already in cart.');
            return;
        }

        const currentCart = JSON.parse(localStorage.getItem('cart'));
        currentCart.push(cartObject);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        setIsAddedToCart(getIsAddedToCart());
    };

    return [isAddedToCart, addProductToCart];
};

export default useAddToCart;
