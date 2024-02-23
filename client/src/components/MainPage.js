import MenuBar from './MenuBar.js';
import UserCard from './UserCard.js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Grid } from '@mui/material';
import '../styles/MainPage.css';

const MainPage = () => {
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
