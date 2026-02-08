
import React from 'react';

const page = async() => {
    const data =await fetch(`http://localhost:5000/api/orders/`).then(res=>res.json()); 
console.log(data);
    return (
        <div>
       
        </div>
    );
};

export default page;