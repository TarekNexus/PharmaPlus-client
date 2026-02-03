import { userService } from '@/services/user.service';


const User = async () => {
     const { data } = await userService.getSession();
    return data.user.role
    
};

export default User;