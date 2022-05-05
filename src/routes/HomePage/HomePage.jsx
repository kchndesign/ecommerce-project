import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardContainer from '../../components/CardContainer';
import ProductCard from '../../components/ProductCard';
import { getProductsById } from '../../server/server';
import Styles from './HomePage.module.scss';
import FilmImage from '../../img/film-image.jpg';
import CameraImage from '../../img/film-camera-image.jpg';
import useAllFavouritedItems from '../../hooks/useAllFavouriteItems';

const HomePage = () => {
    // *********************
    // STATE MANAGEMENT FOR FAVOURITED PRODUCTS
    // using the useFavouritedItems custom hook to interface with the local
    // *********************

    // fill array with null while we load the data
    const [favProducts, setFavProducts] = useState(new Array(3).fill(null));

    // use hook to get and manipulate list of product IDs from localstorage.
    const { listOfFavourites, clearFavourites } = useAllFavouritedItems();

    // on component mount and when listOfFavourites changes, update product IDs array, and load the product data from firestore using the array of product IDs
    useEffect(() => {
        async function fetchFavProducts(array) {
            setFavProducts(await getProductsById(array));
        }
        fetchFavProducts(listOfFavourites);
    }, [listOfFavourites]);

    // when the clear favourites button is clicked, clear all of the favourites from localstorage.
    const handleClearFavourites = () => {
        clearFavourites();
    };

    return (
        <>
            {/* TITLE */}
            <h1 className={Styles.HomePage__Heading}>kchn Film Store</h1>

            {/* NAVIGATION LINKS  */}
            {/* links to both categories */}

            <section
                aria-label="Navigation Links"
                className={Styles.HomePage__flexContainer}
            >
                <Link className={Styles.HomePage__Link} to="film">
                    <img src={FilmImage} alt="Roll of film" />
                    <h2>Shop Film</h2>
                </Link>
                <Link className={Styles.HomePage__Link} to="cameras">
                    <img src={CameraImage} alt="Film camera" />
                    <h2>Shop Film Cameras</h2>
                </Link>
            </section>

            {/* FAVOURITE PRODUCTS SECTION */}
            {/* displays a grid of products */}

            <section
                aria-label="Favourite Products"
                className={Styles.HomePage__favouritesSection}
            >
                <h2>Your Favourite Products</h2>

                {/* clear favourites button */}
                <button
                    className={Styles.HomePage__clearFavourites}
                    onClick={handleClearFavourites}
                >
                    Clear Favourites
                </button>

                {/* grid of favourited products */}
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
