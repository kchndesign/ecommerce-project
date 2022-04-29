import React from "react";
import Styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useImageLoaded from "../../hooks/useImageLoaded.js";
import AddFav from "../../img/add-to-favorites.svg";

import Faved from "../../img/red-heart.svg";
import useFavouritedItem from "../../hooks/useFavouritedItem";

const ProductCard = (props) => {
    // default css styles shows skeleton instead of image
    const [imageStyles, imageLoaded] = useImageLoaded();

    // ******************
    // state management for favourited
    // ******************

    const { isFavourite } = useFavouritedItem(props.product?.id);

    return (
        <Link
            to={`/${props.product?.category}/${props.product?.id}`}
            className={Styles.ProductCard}
        >
            {/* Image container contains the Image, skeleton, overlay and favourited button for easy placement and styling */}
            <div className={Styles.ProductCard__imageContainer}>
                {/* Product image */}
                <img
                    src={props.product?.images.thumb}
                    alt={props.product?.title}
                    className={Styles.ProductCard__img}
                    onLoad={imageLoaded}
                    style={imageStyles.visibleAfterImageLoads}
                />

                {/* Product Image placeholder */}
                <Skeleton
                    className={Styles.ProductCard__img}
                    style={imageStyles.visibleBeforeImageLoads}
                />

                {/* White out of stock overlay displays when the quantity is 0 */}
                {props.product?.quantity === 0 ? (
                    <div
                        className={`${Styles.ProductCard__img} ${Styles.ProductCard__OutOfStock}`}
                    >
                        <p>Out of stock!</p>
                    </div>
                ) : null}

                {/* display favourited icon if this product is favourited */}
                {/* I wanted to add toggle favourited funcionality to this icon but the A tag intercepted clicks */}
                {isFavourite ? (
                    <img
                        src={Faved}
                        alt={
                            isFavourite
                                ? "favourited product"
                                : "add favourite product"
                        }
                        className={Styles.ProductCard__favIcon}
                    />
                ) : null}
            </div>

            {/* Product Name/Title */}
            <h3>{props?.product?.title || <Skeleton />}</h3>

            {/* Product price */}
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
