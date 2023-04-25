import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../../api/auth';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/groups');
  }

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    const { isLoggedIn, errorMessage } = await login(requestBody);

    // if (!isLoggedIn) {
    //   toast.error(errorMessage);
    // } else {
      await authenticateUser();
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate('/groups');
      }
    // }
  };

  return (
    <div className="login-page">
      <div className="login-page-header">
        <h1 className="app-logo app-logo-header">SplitEasy</h1>
        <h2>Welcome back !</h2>
      </div>

      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="form-label-input">
          <input
            className="form-input"
            type="email"
            name="email"
            onChange={handleEmail}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-label-input">
          <input
            className="form-input"
            type="password"
            name="password"
            onChange={handlePassword}
            placeholder="Password"
            required
          />
        </div>

        <button className="btn login-btn" type="submit">
          Log In
        </button>
      </form>

      <div className="to-signup">
        <p>
          Not a member ?{' '}
          <span>
            <Link to={'/signup'}>Register now</Link>
          </span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default LoginPage;
