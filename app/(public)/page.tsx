


import Banner from '@/components/home/Hero';
import MostPopular from '@/components/home/MostPopular';
import React from 'react';

const page = async() => {

    return (
        <div>
           <Banner/>
           <MostPopular/>
        </div>
    );
};

export default page;