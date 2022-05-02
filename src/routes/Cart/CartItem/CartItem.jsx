import React from 'react';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import QuantityInput from '../../../components/QuantityInput';
import { getProduct } from '../../../server/server';
import Styles from './CartItem.module.scss';

const CartItem = (props) => {
    // =================================
    // INITIAL LOAD
    // load the product data from the server with the productId given.
    // put it into a a state.
    // =================================

    // state
    const [currentProduct, setCurrentProduct] = useState({});

    // init
    // await product data.
    // set product data to currentProduct

    useEffect(() => {
        async function getData() {
            const data = await getProduct(props.product.category, {
                id: props.product.productId,
            });

            setCurrentProduct(data);
            console.log(data);
        }

        getData();
    }, []);

    return (
        <div className={Styles.CartItem}>
            <hr />
            <div className={Styles.CartItem__flex}>
                <h3>
                    {currentProduct.title || (
                        <Skeleton height="1.5rem" width="7rem" />
                    )}
                </h3>
                <QuantityInput />
            </div>
            <hr />
        </div>
    );
};

export default CartItem;
