import { useEffect } from 'react';
import MenuBar from './MenuBar.js';
import UserCard from './UserCard.js';
import { Box, Grid } from '@mui/material';
import '../styles/MainPage.css';

const MainPage = () => {
  useEffect(() => {
    // Define a function to check the authentication status
    const checkAuthStatus = () => {
      const auth_token = localStorage.getItem('auth_token');

      if (!auth_token) {
        window.location.href = '/login';
      }
    };

    checkAuthStatus();

    // Set up an interval to check the authentication status every 5 seconds
    const intervalId = setInterval(checkAuthStatus, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Box>
        <MenuBar />
      </Box>
      <Grid container alignItems="center" justifyContent="center" style={{ marginTop: '50px' }}>
        <Grid item width="40%">
          <UserCard />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
