import { Navigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import Loader from "./Loader"; // Add this import

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserStore();
  
  if (loading) {
    return <Loader />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
