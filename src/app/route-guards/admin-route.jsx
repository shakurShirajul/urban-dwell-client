import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "@/shared/hooks/use-admin";
import { useContext } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState } from "@/shared/components/ui/feedback";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <LoadingState label="Checking administrator access…" />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
