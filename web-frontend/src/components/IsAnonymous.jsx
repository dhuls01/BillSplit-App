import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsAnonymous({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading)
    return (
      <div className="spinner">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    );

  if (isLoggedIn) {
    // If the user is logged in, navigate to home page
    return <Navigate to="/groups" />;
  } else {
    // If the user is not logged in, allow to see the page
    return children;
  }
}

export default IsAnonymous;
