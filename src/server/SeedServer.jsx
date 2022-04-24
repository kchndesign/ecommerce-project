import React, { useEffect } from 'react';
import { seedProducts } from './server';
import { films, cameras } from './seed-data';

// DON'T SAVE THIS DOCUMENT WHILE YOU ARE ON THE PAGE BECAUSE THESE FUNCTIONS MIGHT FIRE TWICE!!!

const SeedServer = () => {
    console.log(films, cameras);

    // useEffect(() => {
    //     console.log('seeding films');
    //     seedProducts('film', films);
    //     console.log('seeding cameras');
    //     seedProducts('cameras', cameras);
    //     return () => {
    //         console.log('component unmount');
    //     };
    // }, []);

    return <div>SeedServer</div>;
};

export default SeedServer;
