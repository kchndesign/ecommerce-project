import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardContainer from '../../components/CardContainer';
import ProductCard from '../../components/ProductCard';
import { getProductsById } from '../../server/server';
import Styles from './HomePage.module.scss';
import FilmImage from '../../img/film-image.jpg';
import CameraImage from '../../img/film-camera-image.jpg';

const HomePage = () => {
    const [favProducts, setFavProducts] = useState(
        new Array(4).fill(null)
    );

    // initial data fetch for favourited items
    // get array of IDs from localstorage
    // put the resulting products into an array
    useEffect(() => {
        const localProducts = JSON.parse(
            localStorage.getItem('favourites')
        );

        if (!localProducts) {
            localStorage.setItem(
                'favourites',
                JSON.stringify([])
            );
            localProducts = [];
            return;
        }

        async function fetchFavProducts(array) {
            setFavProducts(await getProductsById(array));
        }
        fetchFavProducts(localProducts);
    }, []);

    return (
        <>
            {/* TITLE */}
            <h1 className={Styles.HomePage__Heading}>
                Kevin's Film Store
            </h1>

            {/* NAVIGATION LINKS  */}
            {/* links to both categories */}

            <section
                aria-label="Navigation Links"
                className={Styles.HomePage__flexContainer}
            >
                <Link
                    className={Styles.HomePage__Link}
                    to="film"
                >
                    <img src={FilmImage} alt="Roll of film" />
                    <h2>Shop Film</h2>
                </Link>
                <Link
                    className={Styles.HomePage__Link}
                    to="cameras"
                >
                    <img src={CameraImage} alt="Film camera" />
                    <h2>Shop Film Cameras</h2>
                </Link>
            </section>

            {/* FAVOURITE PRODUCTS */}
            {/* displays a grid of products */}

            <section aria-label="Favourite Products">
                <h2>Your Favourite Products</h2>
                <CardContainer>
                    {favProducts?.length >= 0
                        ? favProducts.map((product, index) => {
                              return (
                                  <ProductCard
                                      product={product}
                                      key={product?.id || index}
                                  />
                              );
                          })
                        : null}
                </CardContainer>
            </section>
        </>
    );
};

export default HomePage;
