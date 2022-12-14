import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { HashLoader } from 'react-spinners';
import useSeller from '../../hook/useSeller';


const SellerRoute = ({children}) => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email)

    const location = useLocation()
    if (loading || sellerLoading) {
        return <div className='flex justify-center'>
            <HashLoader color="#36d7b7" />
        </div>
    }

    if (user && isSeller) {
        return children;
    }
    return (
        <Navigate  to='/login' state={{ from: location }} replace></Navigate>
    );
};

export default SellerRoute;