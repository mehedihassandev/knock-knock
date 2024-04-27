import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to="/inbox" /> : children;
};

export default PrivateRoute;
