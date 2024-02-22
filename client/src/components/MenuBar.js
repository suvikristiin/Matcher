import { AppBar, Grid, Toolbar } from '@mui/material';
import DropDownMenu from './DropDownMenu.js';
import '../styles/MenuBar.css';

const MenuBar = () => {
  return (
    <>
      <AppBar id="appBar">
        <Toolbar>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <h1>Matcher</h1>
            </Grid>
            <Grid item>
              <DropDownMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MenuBar;
