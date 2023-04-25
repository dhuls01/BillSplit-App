import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate, useLocation } from 'react-router-dom';

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();

  // If the authentication is still loading
  if (isLoading)
    return (
      <div className="spinner">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );

  if (!isLoggedIn) {
    // If the user is not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
}

export default IsPrivate;
