import { Navigate, useLocation } from "react-router-dom";
import useMember from "@/shared/hooks/use-member";
import { useContext } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState } from "@/shared/components/ui/feedback";
import PropTypes from "prop-types";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isMember, isMemberLoading] = useMember();
  const location = useLocation();

  if (loading || isMemberLoading) {
    return <LoadingState label="Checking resident access…" />;
  }

  if (user && isMember) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

MemberRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MemberRoute;
