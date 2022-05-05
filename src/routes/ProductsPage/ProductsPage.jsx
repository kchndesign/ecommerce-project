import React, { useEffect, useState } from 'react';
import Styles from './ProductsPage.module.scss';
import CardContainer from '../../components/CardContainer';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../server/server';
import Carousel from '../../components/Carousel';
import { useParams } from 'react-router-dom';

const ProductsPage = () => {
    // initialise with empty products to show skeleton placeholders
    const [products, setProducts] = useState(Array(6).fill(null));

    // get the category of products to display
    const { category } = useParams();

    // initial fetch products
    useEffect(() => {
        setProducts(Array(6).fill(null));

        async function fetchProducts() {
            const data = await getProducts(category);
            setProducts(data);
        }

        fetchProducts();
    }, [category]);

    return (
        <>
            <h2 className={Styles.ProductsPage__heading}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
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
        </>
    );
};

export default ProductsPage;
