import React, { useEffect, useState } from 'react';
import Styles from './HomePage.module.scss';
import CardContainer from '../../components/CardContainer/';
import ProductCard from '../../components/ProductCard/';

const HomePage = () => {
    const [products, setProducts] = useState(null);

    async function fetchProducts() {
        const resp = await fetch(
            'https://fakestoreapi.com/products/category/electronics'
        );
        const data = await resp.json();
        console.log(data);
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={Styles.HomePage}>
            <h1>This is a web store</h1>
            <h2>This is a category</h2>
            <CardContainer>
                {products
                    ? products.map((product) => {
                          return (
                              <ProductCard
                                  product={product}
                                  key={product.id}
                              />
                          );
                      })
                    : null}
            </CardContainer>
        </div>
    );
};

export default HomePage;
