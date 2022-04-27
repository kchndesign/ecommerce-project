// this hook allows components to easily use local storage to get and update the local storage object for favourited items. Which will just be an array of product IDs
// every time useFavouritedItems hook is called, it checks if the localstorage has it already, and adds in an empty array if it doesnt.
// utilities that should be available:

import { useState } from 'react';

// pushFavouritedItem()
// parses the json,
// adds an id
// sets the stringified json

// removeFavouritedItem()
// parses json
// filters the resulting array.
// sets the stringified json

// isFavourite();
// returns a boolean
// should i use state for this?

// clearFavourites()
// remove all of the previous entries and replace with an empty array

const useFavouritedItems = (initialString) => {
    // inital check for the localStorage 'favourites' entry
    // this happens every time useFavouritedItems is called
    // to avoid errors later on.
    let favouritesArr = [];
    if (localStorage.getItem('favourites') === null) {
        localStorage.setItem(
            'favourites',
            JSON.stringify(favouritesArr)
        );
    } else {
        updateLocalFavourites();
    }

    // initialise state by polling localstorage.
    // convenient for components so they dont have to use useEffect()
    const [isFavourite, setIsFavourite] = useState(
        amIFavourite(initialString)
    );

    function updateLocalFavourites() {
        favouritesArr = JSON.parse(
            localStorage.getItem('favourites')
        );
    }

    // update favourites array for peace of mind
    // push item into favourites array
    // set local storage to favourites array
    function pushFavouritedItem(item) {
        if (typeof item !== 'string') {
            return null;
        }

        updateLocalFavourites();
        favouritesArr.push(item);
        localStorage.setItem(
            'favourites',
            JSON.stringify(favouritesArr)
        );
        setIsFavourite(true);
        return favouritesArr;
    }

    // filter the existing array into a new array to exclude the inputted item
    // setItem on the new array
    // updateLocalFavourites to update the local array
    function removeFavouritedItem(item) {
        if (typeof item !== 'string') {
            return null;
        }

        updateLocalFavourites();
        let newArray = favouritesArr.filter(
            (entry) => entry !== item
        );
        localStorage.setItem(
            'favourites',
            JSON.stringify(newArray)
        );
        setIsFavourite(false);
        updateLocalFavourites();
        return favouritesArr;
    }

    // this function is only used when initialising state internally
    function amIFavourite(item) {
        if (typeof item !== 'string') {
            return null;
        }

        updateLocalFavourites();
        return favouritesArr.some((entry) => entry === item);
    }

    // reassign our local array to an empty array
    // setItem on the empty array
    function clearFavourites() {
        favouritesArr = [];
        localStorage.setItem(
            'favourites',
            JSON.stringify(favouritesArr)
        );
        setIsFavourite(false);
    }

    return {
        isFavourite,
        pushFavouritedItem,
        removeFavouritedItem,
        clearFavourites,
    };
};

export default useFavouritedItems;
