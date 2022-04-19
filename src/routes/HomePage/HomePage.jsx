import React, { useEffect, useState } from 'react';
import Styles from './HomePage.module.scss';
import CardContainer from '../../components/CardContainer/';
import ProductCard from '../../components/ProductCard/';
import { getProducts } from '../../server/server';
import Carousel from '../../components/Carousel/';

const HomePage = () => {
    const [products, setProducts] = useState(Array(6).fill(null));

    async function fetchProducts() {
        const data = await getProducts('film');
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <div className={Styles.HomePage}>
            <h1>Buy some things</h1>
            <Carousel
                featuredProducts={products.filter((product) => {
                    return product?.isFeatured ? true : false;
                })}
            />
            {/* <h2>Category:</h2> */}
            <CardContainer>
                {products.map((product, index) => {
                    return (
                        <ProductCard
                            product={product}
                            key={product?.id ?? index}
                        />
                    );
                })}
            </CardContainer>
        </div>
    );
};

export default HomePage;
