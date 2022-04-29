import { useState } from "react";

const useImageLoaded = () => {
    // css states to show skeleton instead of image
    const [imageStyles, setImageStyles] = useState({
        visibleAfterImageLoads: {
            display: "none",
        },
        visibleBeforeImageLoads: {
            display: "block",
        },
    });

    // this is called when the image loads, and swaps the styles
    // so that the skeleton is hidden and actual content is showed
    const imageLoaded = () => {
        setImageStyles({
            visibleAfterImageLoads: {
                display: "block",
            },
            visibleBeforeImageLoads: {
                display: "none",
            },
        });
    };

    const resetImageLoaded = () => {
        setImageStyles({
            visibleAfterImageLoads: {
                display: "none",
            },
            visibleBeforeImageLoads: {
                display: "block",
            },
        });
    };

    return [imageStyles, imageLoaded, resetImageLoaded];
};

export default useImageLoaded;
