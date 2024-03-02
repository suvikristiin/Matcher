import { useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import MenuBar from './MenuBar.js';
import Chat from './Chat.js';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [matches, setMatches] = useState([{}]);
  const [selectedMatch, setSelectedMatch] = useState();

  const auth_token = localStorage.getItem('auth_token');

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch('/chats/matches', {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + auth_token,
        },
        mode: 'cors',
      });

      if (!response.ok) {
        console.log(response);
        console.log(response.status);
        throw new Error('Failed to fetch a matches.');
      } else {
        const responseJson = await response.json();
        setMatches(responseJson.matchesUserData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth_token]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleSelectedChat = (match) => {
    setSelectedMatch(match);
  };

  return (
    <>
      <Box>
        <MenuBar />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4} id="matchesList">
          {matches.map((match, index) => (
            <p id="userChatLink" key={index} onClick={() => handleSelectedChat(match)}>
              {match.username}
            </p>
          ))}
        </Grid>
        <Grid item xs={6} id="chatWindow">
          {selectedMatch ? (
            <Chat />
          ) : (
            <p id="selectChat-info">Please select a chat to start messaging...</p>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ChatPage;
