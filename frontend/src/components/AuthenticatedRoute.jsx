import { Navigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import Loader from "./Loader";

const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserStore();
  
  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }
  
  // If already authenticated, redirect to home
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default AuthenticatedRoute;