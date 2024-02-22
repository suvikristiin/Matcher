import Grid from '@mui/material/Grid';
import '../styles/UserCard.css';

const UserCard = () => {
  return (
    <>
      <Grid id="userCard" container>
        <Grid id="userCardTitle" item>
          User X
        </Grid>
        <Grid id="userCardContent" item>
          <h3>Hi, I like Hedgehog</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse
            lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
            ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
            amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
            enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede.
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default UserCard;
