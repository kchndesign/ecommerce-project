import React, { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import Styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import useImageLoaded from '../../hooks/useImageLoaded';

// loop through the given array of featured products and render a
// child for the carousel library.

const Carousel = (props) => {
    // ***************
    // MEMOIZE PREVIOUS CATEGORY
    // this is needed because react will send a new props object down that is identical in values to the previous one. This results in our carousel re-displaying the loading skeleton but the images never trigger onLoad (because they are already loaded).
    // ****************
    let previousCategory = useRef();

    // when component mounts:
    // initialise the reference
    useEffect(() => {
        previousCategory.current = props.featuredProducts;
    }, []);

    // ************
    // IMAGE AND SKELETON STATE MANAGEMENT
    // ************
    const [imageStyles, imageLoaded, resetImageLoaded] =
        useImageLoaded();

    // when it's parent sends new props, we need to reset the image styles
    // compare the new props with the memoized current props.
    // we have to do this because React is sending new props to this component
    // with the same values even when the route doesnt change.
    useEffect(() => {
        // if the value of the new props are not the same as the memoised previous props:
        if (
            JSON.stringify(props.featuredProducts) !==
            JSON.stringify(previousCategory.current)
        ) {
            resetImageLoaded();
            previousCategory.current = props.featuredProducts;
        }
    }, [props.featuredProducts]);

    return (
        <React.Fragment>
            {/* Using responsive carousel library: */}
            <ResponsiveCarousel
                style={imageStyles.imgStyle}
                showThumbs={false}
                showStatus={false}
            >
                {/* for every featured product given to this component as a prop, render a carousel slide */}
                {props.featuredProducts.map((product, index) => {
                    return product?.images ? (
                        // carousel slide
                        <div
                            style={
                                imageStyles.visibleAfterImageLoads
                            }
                            key={product.id}
                            className={Styles.CarouselItem}
                        >
                            <Link to={`${product.id}`}>
                                {/* image that gets either featured image or the thumbnail */}
                                {/* the first image also triggers an onload event to swap the skeleton and carousels */}
                                <img
                                    src={
                                        product.images?.[
                                            'featured'
                                        ] ||
                                        product.images?.['thumb']
                                    }
                                    alt={product.title}
                                    key={product.id}
                                    className={
                                        Styles.CarouselItem__image
                                    }
                                    onLoad={
                                        index === 0
                                            ? imageLoaded
                                            : null
                                    }
                                />
                                {/* overlay for the carousel item features the heading text, price and a dark filter  */}
                                <div
                                    className={
                                        Styles.CarouselItem__text
                                    }
                                >
                                    {/* heading text / title for featured product */}
                                    <h3>
                                        {product.title || (
                                            <Skeleton />
                                        )}
                                    </h3>
                                    {/* price text for the featured product */}
                                    <p>
                                        {product?.price ? (
                                            `$${product.price.toFixed(
                                                2
                                            )}`
                                        ) : (
                                            <Skeleton />
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        // skeleton replaces the whole carousel until an image is loaded
                        <Skeleton height="20rem" />
                    );
                })}
            </ResponsiveCarousel>
            <Skeleton
                height="20rem"
                style={imageStyles.visibleBeforeImageLoads}
            />
        </React.Fragment>
    );
};

export default Carousel;
