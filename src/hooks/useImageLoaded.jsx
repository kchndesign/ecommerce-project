import { useState } from 'react';

const useImageLoaded = () => {
    // css states to show skeleton instead of image
    const [imageStyles, setImageStyles] = useState({
        imgStyle: {
            display: 'none',
        },
        skeleStyle: {
            display: 'block',
        },
    });

    // this is called when the image loads, and swaps the styles
    // so that the skeleton is hidden and actual content is showed
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

    return [imageStyles, imageLoaded];
};

export default useImageLoaded;
