// PrivateRoute.js
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (user) {
    return <Navigate to="/signin" />;
    // return children;
  }
  
  return <Navigate to="/signin" />;
};



PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;