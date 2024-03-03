import { useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import MenuBar from './MenuBar.js';
import UserCard from './UserCard.js';
import { Box, Grid } from '@mui/material';
import '../styles/MainPage.css';

const MainPage = () => {
  useEffect(() => {
    // Define a function to check if the authentication has expired
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      // Decode the JWT token to access its payload, including the expiration time
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      // Check if the token's expiration time is less than the current time
      if (decoded.exp < currentTime) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    };

    checkTokenExpiration();
    // Set up an interval to repeatedly check token expiration every second
    const intervalId = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Box>
        <MenuBar />
      </Box>
      <Grid container alignItems="center" justifyContent="center" style={{ marginTop: '50px' }}>
        <Grid item width="30%">
          <UserCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
