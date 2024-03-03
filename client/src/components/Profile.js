import MenuBar from './MenuBar.js';
import { Box, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    introductionText: '',
  });
  const auth_token = localStorage.getItem('auth_token');

  // Fetch user's profile data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/user/profile', {
          method: 'GET',
          headers: {
            authorization: 'Bearer ' + auth_token,
          },
          mode: 'cors',
        });
        if (response.status == 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        console.log(response);
        const data = await response.json();
        setUser({
          email: data.email || '',
          username: data.username || '',
          password: '',
          introductionText: data.introductionText || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth_token]);

  // Handle changes to form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(user),
      });
      if (response.status == 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      } else if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <>
      <Box>
        <MenuBar />
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <h1 id="profileHeading">Edit your information</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              className="profileTextField"
              margin="normal"
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              className="profileTextField"
              margin="normal"
              label="Username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              className="profileTextField"
              margin="normal"
              label="Update password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              className="profileTextField"
              margin="normal"
              label="Introduction Text"
              name="introductionText"
              value={user.introductionText}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            <Button
              id="updateProfile"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Update Profile
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
