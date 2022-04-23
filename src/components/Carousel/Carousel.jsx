import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import Styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';

// loop through the given array of featured products and render a
// child for the carousel library.
// also features some boilerplate for the skeleton => image replacement

const Carousel = (props) => {
    const [imageStyles, setImageStyles] = useState({
        imgStyle: {
            display: 'none',
        },
        skeleStyle: {
            display: 'block',
        },
    });

    // when this function is called, it sets the styles so that
    // skeletons are hidden and actual content is displayed
    const imageLoaded = () => {
        console.log('imageloaded');
        setImageStyles({
            imgStyle: {
                display: 'block',
            },
            skeleStyle: {
                display: 'none',
            },
        });
    };

    // when it's parent sends new props, we need to reset the image styles
    // I use useEffect here because we only want to do this when
    // the dependency has actually changed.
    useEffect(() => {
        setImageStyles({
            imgStyle: {
                display: 'none',
            },
            skeleStyle: {
                display: 'block',
            },
        });
    }, [props.featuredProducts]);

    return (
        <React.Fragment>
            <ResponsiveCarousel
                style={imageStyles.imgStyle}
                showThumbs={false}
                showStatus={false}
            >
                {props.featuredProducts.map((product, index) => {
                    return product?.images ? (
                        <div
                            style={imageStyles.imgStyle}
                            key={product.id}
                            className={Styles.CarouselItem}
                        >
                            <Link to={`${product.id}`}>
                                <img
                                    src={
                                        product.images?.[
                                            'featured'
                                        ] ||
                                        product.images?.['thumb']
                                    }
                                    key={product.id}
                                    className={
                                        Styles.CarouselItem__image
                                    }
                                    onLoad={
                                        index == 0
                                            ? imageLoaded
                                            : null
                                    }
                                />
                                <div
                                    className={
                                        Styles.CarouselItem__text
                                    }
                                >
                                    <h3>
                                        {product.title || (
                                            <Skeleton />
                                        )}
                                    </h3>
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
                        <Skeleton height="20rem" />
                    );
                })}
            </ResponsiveCarousel>
            <Skeleton
                height="20rem"
                style={imageStyles.skeleStyle}
            />
        </React.Fragment>
    );
};

export default Carousel;
