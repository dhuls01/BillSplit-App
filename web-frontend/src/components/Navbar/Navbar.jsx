import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {isLoggedIn && (
        <>
          {location.pathname !== '/groups' && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="icon-btn back-btn"
            >
              <i className="fa-solid fa-angle-left fa-2x"></i>
            </button>
          )}
        </>
      )}
      <Link className="text-link" to="/groups">
        <h1 className="app-logo">SplitEasy</h1>
      </Link>
      {isLoggedIn && (
        <button onClick={logOutUser} className="icon-btn logout-btn">
          <i className="fa-solid fa-right-from-bracket fa-2x"></i>
        </button>
      )}
    </div>
  );
}

export default Navbar;
