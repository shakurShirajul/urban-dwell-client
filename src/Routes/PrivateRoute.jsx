import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if(loading){
        return <div className="progress w-56"></div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace={true}></Navigate>
};

export default PrivateRoute;