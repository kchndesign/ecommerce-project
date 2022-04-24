import React, { useState } from 'react';
import Styles from './ProductCard.module.scss';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import useImageLoaded from '../../hooks/useImageLoaded.jsx';

const ProductCard = (props) => {
    // default css styles shows skeleton instead of image
    const [imageStyles, imageLoaded] = useImageLoaded();

    return (
        <Link
            to={`${props.product?.id || '#'}`}
            className={Styles.ProductCard}>
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
            {props.product?.quantity === 0 ? (
                <div
                    className={`${Styles.ProductCard__img} ${Styles.ProductCard__OutOfStock}`}>
                    <p>Out of stock!</p>
                </div>
            ) : null}
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
