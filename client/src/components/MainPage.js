import { useEffect } from 'react';
import MenuBar from './MenuBar.js';
import UserCard from './UserCard.js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Grid } from '@mui/material';
import '../styles/MainPage.css';

const MainPage = () => {
  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token');

    if (!auth_token) {
      window.location.href = '/login';
    }

    const fetchUserData = async () => {
      const response = await fetch('/home', {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + auth_token,
        },
        mode: 'cors',
      });
      const responseJson = await response.json();
      console.log(await responseJson);
    };
    fetchUserData();
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
      <Grid id="matchButtons" container spacing={2} alignItems="center" justifyContent="center">
        <Grid item justifyContent="center" alignItems="center">
          <FavoriteBorderIcon id="disLikeButton" />
        </Grid>
        <Grid item>
          <FavoriteBorderIcon id="likeButton" />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
