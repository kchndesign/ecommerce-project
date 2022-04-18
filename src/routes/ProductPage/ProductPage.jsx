import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Styles from './ProductPage.module.scss';

const ProductPage = (props) => {
    const [currentProductData, setCurrentProductData] = useState({});
    const urlParam = useParams();

    async function getCurrentProduct() {
        const resp = await fetch(
            `https://fakestoreapi.com/products/${urlParam.id}`
        );
        const data = await resp.json();
        setCurrentProduct(data);
    }

    useEffect(() => {
        getCurrentProduct();
    }, []);

    return (
        <div className={Styles.ProductPage}>
            <Link to="/">Home</Link>
        </div>
    );
};

export default ProductPage;
