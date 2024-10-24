import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
