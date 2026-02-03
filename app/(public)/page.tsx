
import { userService } from '@/services/user.service';
import React from 'react';

const page = async() => {
   const {data,error}=await userService.getSession();
 console.log(data);
   console.log(data,error);
    return (
        <div>
            home
        </div>
    );
};

export default page;