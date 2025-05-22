import { Navigate, useLocation } from "react-router-dom";
import useMember from "../hooks/useMember";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isMember, isMemberLoading] = useMember();
  const location = useLocation();

  if (loading || isMemberLoading) {
    // return <div className="w-56"></div>
    return <div></div>;
  }

  if (user && isMember) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default MemberRoute;
