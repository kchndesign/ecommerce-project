import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Styles from './ProductPage.module.scss';
import Skeleton from 'react-loading-skeleton';

const ProductPage = (props) => {
    const [currentProductData, setCurrentProductData] = useState({});

    const urlParam = useParams();

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

    async function getCurrentProduct() {
        const resp = await fetch(
            `https://fakestoreapi.com/products/${urlParam.id}`
        );
        const data = await resp.json();
        setCurrentProductData(data);
    }

    useEffect(() => {
        getCurrentProduct();
    }, []);

    return (
        <div className={Styles.ProductPage}>
            <div className={Styles.ProductPage__container}>
                <div className={Styles.ProductPage__image}>
                    <img
                        src={currentProductData.image}
                        onLoad={imageLoaded}
                        style={imageStyles.imgStyle}
                    />
                    <Skeleton
                        style={imageStyles.skeleStyle}
                        className={
                            Styles.ProductPage__imagePlaceholder
                        }
                    />
                </div>
                <div className={Styles.ProductPage__info}>
                    <h2 className={Styles.ProductPage__title}>
                        {currentProductData.title || <Skeleton />}
                    </h2>
                    <p className={Styles.ProductPage__price}>
                        ${currentProductData.price || <Skeleton />}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
