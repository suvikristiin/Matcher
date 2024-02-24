import { Grid, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
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
      <Grid id="registerBackground" item>
        <p id="registerLogo">Matcher</p>
      </Grid>
      <Grid item id="registerFormGrid">
        <form id="registerForm">
          <Typography id="signupTitle">
            Sign up for the <span>Matcher...</span>
          </Typography>
          <CustomTextField id="email" label="Email" margin="normal"></CustomTextField>

          <CustomTextField id="username" label="Username" margin="normal"></CustomTextField>

          <CustomTextField id="password" label="Password" margin="normal"></CustomTextField>

          <Button id="signupButton" variant="contained" size="large">
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
