import { Navigate } from "react-router-dom";
import useUserStore from "../store/UserStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserStore();
  if (loading) {
    return <Loader />;
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
