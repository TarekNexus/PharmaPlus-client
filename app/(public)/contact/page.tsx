import Banner from '@/components/home/contact/Hero';
import FaqSection from '@/components/home/FAQSection';
import Features from '@/components/home/Features';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner></Banner>
             <Features/>
                       <FaqSection></FaqSection>
        </div>
    );
};

export default page;