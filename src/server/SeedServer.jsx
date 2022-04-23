import React, { useEffect } from 'react';
import { seedProducts } from './server';
import { films, cameras } from './seed-data';

// TURN OFF STRICT MODE IN INDEX.JS OR ELSE THESE FUNCTIONS WILL FIRE TWICE!!!

const SeedServer = () => {
    console.log(films, cameras);

    // useEffect(() => {
    //     seedProducts('film', films);
    //     return () => {
    //         console.log('component unmount');
    //     };
    // }, []);

    return <div>SeedServer</div>;
};

export default SeedServer;
