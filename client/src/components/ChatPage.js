import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MenuBar from './MenuBar.js';
import Chat from './Chat.js';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [matches, setMatches] = useState([{}]);
  const [selectedMatch, setSelectedMatch] = useState();
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const auth_token = localStorage.getItem('auth_token');

   // Fetches matches for the authenticated user
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
        console.log('matchit', responseJson);
        setMatches(responseJson.matchesUserData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [auth_token]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

    // Handles selecting a chat by updating state with the selected match
  const handleSelectedChat = (match) => {
    setSelectedMatchId(match._id);
    setSelectedMatch(match);
  };

  return (
    <>
      <Box>
        <MenuBar />
      </Box>
      <Box id="chatPageContent">
        <Box id="matchesList">
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <p
                id="userChatLink"
                className={
                  selectedMatchId === match._id ? 'selectedColor clicked' : 'selectedColor'
                }
                key={index}
                onClick={() => handleSelectedChat(match)}
              >
                {match.username}
              </p>
            ))
          ) : (
            <p id="noMatches">No matches...</p>
          )}
        </Box>

        <Box id="chatWindow">
          {selectedMatch ? (
            <Chat selectedMatch={selectedMatch} />
          ) : (
            <p id="selectChat-info">Please select a chat to start messaging...</p>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
