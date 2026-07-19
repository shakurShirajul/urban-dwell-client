import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState } from "@/shared/components/ui/feedback";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <LoadingState label="Checking your account…" />;
  }

  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
