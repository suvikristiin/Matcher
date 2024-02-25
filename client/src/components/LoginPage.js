import { Grid, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  

  return (
    <Grid container spacing={2}>
      <Grid id="loginBackground" item>
        <p id="loginLogo">Matcher</p>
      </Grid>
      <Grid item id="loginFormGrid">
        <form id="loginForm">
          <Typography id="loginTitle">Log in to the <span>Matcher...</span></Typography>
          <TextField className='customTextField' id="username" label="Username" margin="normal" ></TextField>

          <TextField className='customTextField' id="password" label="Password" margin="normal"></TextField>
          <Button id="loginButton" variant="contained" size="large">
            Log in
          </Button>
          <Typography id="signupLinkInfo">
            {"Don't have an account?"}
            <Link id="signupLink" to="/register" style={{ textDecoration: 'none' }}>
              {' '}
              Sign Up
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
