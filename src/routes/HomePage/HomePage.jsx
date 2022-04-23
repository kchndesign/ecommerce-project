import React, { useEffect, useState } from 'react';
import Styles from './HomePage.module.scss';
import CardContainer from '../../components/CardContainer/';
import ProductCard from '../../components/ProductCard/';
import { getProducts } from '../../server/server';
import Carousel from '../../components/Carousel/';

const HomePage = () => {
    // initialise with empty products to show skeleton placeholders
    const [products, setProducts] = useState(
        Array(6).fill(null),
    );

    // initial fetch products
    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts('film');
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <div className={Styles.HomePage}>
            <h2 className={Styles.HomePage__heading}>Film</h2>
            <Carousel
                featuredProducts={products.filter((product) => {
                    return product?.isFeatured ? true : false;
                })}
            />
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
