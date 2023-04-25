import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './SignupPage.css';
import { signup } from '../../api/auth';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordConfirm(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  function validatePassword(e) {
    if (password !== passwordConfirm) {
      e.target.setCustomValidity("Passwords Don't Match");
    } else {
      e.target.setCustomValidity('');
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: email.trim(),
      password,
      firstName: capitalizeFirstLetter(firstName.trim()),
      lastName: capitalizeFirstLetter(lastName.trim()),
    };
    const { isSignedUp, errorMessage } = await signup(requestBody);

    if (!isSignedUp) {
      toast.error(errorMessage);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page-header">
        <h1 className="app-logo app-logo-header">SplitEasy</h1>
        <h2>Sign up</h2>
      </div>

      <form className="signup-form" onSubmit={handleSignupSubmit}>
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
            type="text"
            name="firstName"
            onChange={handleFirstName}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-label-input">
          <input
            className="form-input"
            type="text"
            name="lastName"
            onChange={handleLastName}
            placeholder="Last Name"
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

        <div className="form-label-input">
          <input
            className="form-input"
            type="password"
            name="password-confirm"
            onChange={handlePasswordConfirm}
            onKeyUp={validatePassword}
            placeholder="Confirm password"
            required
          />
        </div>

        <button className="btn signup-btn" type="submit">
          Sign Up
        </button>
      </form>

      <div className="to-signin">
        <p>
          Already have an account ?{' '}
          <span>
            <Link to={'/login'}>Log in</Link>
          </span>
        </p>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default SignupPage;
