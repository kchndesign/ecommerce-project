import React, { useState } from 'react';
import Styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ProductCard = (props) => {
    const [imageStyles, setImageStyles] = useState({
        imgStyle: {
            display: 'none',
        },
        skeleStyle: {
            display: 'block',
        },
    });

    const imageLoaded = () => {
        setImageStyles({
            imgStyle: {
                display: 'block',
            },
            skeleStyle: {
                display: 'none',
            },
        });
    };

    return (
        <Link
            to={`/product/${props.product?.id || '#'}`}
            className={Styles.ProductCard}
        >
            <img
                src={props.product?.images.thumb}
                alt={props.product?.title}
                className={Styles.ProductCard__img}
                onLoad={imageLoaded}
                style={imageStyles.imgStyle}
            />
            <Skeleton
                className={Styles.ProductCard__img}
                style={imageStyles.skeleStyle}
            />
            <h3>{props?.product?.title || <Skeleton />}</h3>
            <p>
                {props.product ? (
                    `$${props.product.price.toFixed(2)}`
                ) : (
                    <Skeleton />
                )}
            </p>
        </Link>
    );
};

export default ProductCard;
