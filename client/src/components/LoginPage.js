import { Grid, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fb4444',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#fdc7c7',
      },
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid id="loginBackground" item>
        <p id="loginLogo">Matcher</p>
      </Grid>
      <Grid item id="loginFormGrid">
        <form id="loginForm">
          <Typography id="loginTitle">Log in to the <span>Matcher...</span></Typography>
          <CustomTextField id="username" label="Username" margin="normal" ></CustomTextField>

          <CustomTextField id="password" label="Password" margin="normal"></CustomTextField>
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
