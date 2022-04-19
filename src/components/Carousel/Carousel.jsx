import ArrowButton from './ArrowButton/';
import React, { useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Styles from './Carousel.module.scss';
import { Link } from 'react-router-dom';

const Carousel = (props) => {
    const [innerStyles, setInnerStyles] = useState({
        transform: 'translateX(0px)',
    });
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselInner = useRef();
    const wholeCarousel = useRef();

    const next = () => {
        const carouselWidth =
            wholeCarousel.current.getBoundingClientRect().width;

        carouselInner.transform;
        console.log(carouselInner, carouselWidth);
    };

    return (
        <div
            className={Styles.Carousel}
            id={Styles.Carousel}
            ref={wholeCarousel}
        >
            <ArrowButton isLeft={true} controls={Styles.Carousel} />
            <ArrowButton
                isLeft={false}
                next={next}
                controls={Styles.Carousel}
            />
            <CarouselInner
                innerStyles={innerStyles}
                product={product}
                images={images}
                carouselInner={carouselInner}
                price={price}
            />
        </div>
    );
};

export default Carousel;

function CarouselInner({
    innerStyles,
    product,
    images,
    carouselInner,
    price,
}) {
    return (
        <div className={Styles.CarouselInner} style={innerStyles}>
            {props.featuredProducts.map((product) => {
                return product?.images ? (
                    <div
                        className={Styles.CarouselItem}
                        key={product.id}
                        ref={carouselInner}
                    >
                        <Link to={`/product/${product.id}`}>
                            <div
                                className={Styles.CarouselItem__text}
                            >
                                <h3>
                                    {product.title || <Skeleton />}
                                </h3>
                                <p>
                                    {product?.price ? (
                                        `$${product.price.toFixed(2)}`
                                    ) : (
                                        <Skeleton />
                                    )}
                                </p>
                            </div>
                        </Link>
                        <img
                            src={
                                product.images?.['featured'] ||
                                product.images?.['thumb']
                            }
                            key={product.id}
                            className={Styles.CarouselItem__image}
                        />
                    </div>
                ) : (
                    <Skeleton height="200px" />
                );
            })}
        </div>
    );
}
