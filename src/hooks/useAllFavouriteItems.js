import { useState } from "react";

const useAllFavouritedItems = (initialString) => {
    // inital check for the localStorage 'favourites' entry
    // this happens every time useFavouritedItems is called
    // to avoid errors later on.
    let favouritesArr = [];
    if (localStorage.getItem("favourites") === null) {
        localStorage.setItem(
            "favourites",
            JSON.stringify(favouritesArr)
        );
    } else {
        updateLocalFavourites();
    }

    // ********************
    // INTERNALLY USED FUNCTIONS
    // these functions arent exported but are used internally to avoid repeating code.
    // ********************

    function updateLocalFavourites() {
        favouritesArr = JSON.parse(
            localStorage.getItem("favourites")
        );
    }

    // get all favourites and returns it into the listOfFavourites state
    function getListOfFavourites() {
        updateLocalFavourites();
        setListOfFavourites(favouritesArr);
    }

    // *********************
    // INITIALISING STATES
    // *********************

    // initialise a list of empty array items for components that want to render
    // a list of favourited items.
    const [listOfFavourites, setListOfFavourites] =
        useState(favouritesArr);

    // ********************************
    // EXPORTED FUNCTIONS
    // ********************************

    // reassign our local array to an empty array
    // setItem on the empty array
    function clearFavourites() {
        favouritesArr = [];
        localStorage.setItem(
            "favourites",
            JSON.stringify(favouritesArr)
        );
        getListOfFavourites();
    }

    return {
        listOfFavourites,
        getListOfFavourites,
        clearFavourites,
    };
};

export default useAllFavouritedItems;
