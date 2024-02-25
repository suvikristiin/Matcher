import { Grid, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  // State of the registration form
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
  });
  // State for displaying an error message if registration fails
  const [errorMessage, setErrorMessage] = useState('');

  // Handler function for form input changes, updates the registerData state
  const handleRegistrationChange = (event) => {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  };

  // Handler fuction for form Submission
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    // Register the user by sending a POST request to the server
    try {
      const responseRegister = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(registerData),
        mode: 'cors',
      });
      const responseJson = await responseRegister.json();

      if (responseRegister.status === 201) {
        // If registration is successful, redirect to the login page
        window.location.href = '/login';
      } else {
        // If registration fails, set an error message to the state
        setErrorMessage(responseJson.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid id="registerBackground" item>
        <p id="registerLogo">Matcher</p>
      </Grid>
      <Grid item id="registerFormGrid">
        <form id="registerForm" onSubmit={handleRegistrationSubmit}>
          <Typography id="signupTitle">
            Sign up for the <span>Matcher...</span>
          </Typography>
          <TextField
            className="customTextField"
            id="emailRegister"
            name="email"
            type="email"
            value={registerData.email}
            label="Email"
            margin="normal"
            onChange={handleRegistrationChange}
            variant="outlined"
          ></TextField>

          <TextField
            className="customTextField"
            id="usernameRegister"
            name="username"
            type="text"
            value={registerData.username}
            label="Username"
            margin="normal"
            onChange={handleRegistrationChange}
          ></TextField>

          <TextField
            className="customTextField"
            id="passwordRegister"
            name="password"
            type="password"
            value={registerData.password}
            label="Password"
            margin="normal"
            onChange={handleRegistrationChange}
          ></TextField>
          {/* Display error message if registration fails */}
          {errorMessage && <p id="registerErrorMessage">{errorMessage}</p>}
          <Button id="signupButton" type="submit" variant="contained" size="large">
            Sign Up
          </Button>
          <Typography id="loginLinkInfo">
            Do you already have an account?
            <Link id="loginLink" to="/login" style={{ textDecoration: 'none' }}>
              {' '}
              Log In
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
