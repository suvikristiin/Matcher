import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../styles/DropDownMenu.css';

import { useState } from 'react';

const DropDownMenu = () => {
  // Initialize state for anchorEl  with null
  const [anchorEl, setAnchorEl] = useState(null);
  // Determine if the menu is open based on whether anchorEl is not null
  const open = Boolean(anchorEl);

  // Define the function to handle clicking the menu button
  const handleClickMenu = (event) => {
    // Set anchorEl to the current target (button)
    setAnchorEl(event.currentTarget);
  };

  // Define the function to close the menu
  const handleClose = () => {
    // Sets anchorEl back to null, which will close the menu
    setAnchorEl(null);
  };

  // Define the function to handle user logout
  const handleLogout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  return (
    <>
      <Button
        id="menuButton"
        variant="contained"
        size="large"
        onClick={handleClickMenu}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Menu
      </Button>
      <Menu id="menuList" onClose={handleClose} open={open} anchorEl={anchorEl}>
        <MenuItem>Edit your information</MenuItem>
        <MenuItem>Add new image</MenuItem>
        <MenuItem>List your chats</MenuItem>
        <MenuItem id="LogOutButton" onClick={handleLogout}>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDownMenu;
