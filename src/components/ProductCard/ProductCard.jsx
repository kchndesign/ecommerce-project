import React from 'react';
import Styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    return (
        <Link
            to={`/product/${props.product.id}`}
            className={Styles.ProductCard}
        >
            <img
                src={props.product.image}
                alt={props.product.title}
                className={Styles.ProductCard__img}
            />
            <h3>{props.product.title}</h3>
            <p>{props.product.price}</p>
        </Link>
    );
};

export default ProductCard;
