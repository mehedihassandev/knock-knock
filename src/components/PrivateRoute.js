import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
