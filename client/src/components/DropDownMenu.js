import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../styles/DropDownMenu.css';

import { useState } from 'react';

const DropDownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default DropDownMenu;
