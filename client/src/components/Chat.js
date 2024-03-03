import { TextField, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import '../styles/Chat.css';

const Chat = (selectedMatch) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [authTokenId, setAuthTokenId] = useState('');
  const [refreshMessages, setRefreshMessages] = useState(false);
  const auth_token = localStorage.getItem('auth_token');

  // Fetches messages whenever selectedMatch or auth_token changes or a message is sent
  useEffect(() => {
    console.log(selectedMatch);
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/chats/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth_token,
          },
          body: JSON.stringify(selectedMatch),
          mode: 'cors',
        });
        if (response.status == 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        } else if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages);
        setAuthTokenId(data.authUserId);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedMatch, auth_token, refreshMessages]);

  // Handles the submission of a new message
  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/chats/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth_token,
        },
        body: JSON.stringify({
          receiverId: selectedMatch,
          content: messageContent,
        }),
        mode: 'cors',
      });
      if (response.status == 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      } else if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const { data } = await response.json();
      console.log(data);
      setRefreshMessages(!refreshMessages);
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Box>
        <Box id="messages">
          {messages.map(
            (message, index) => (
              console.log(message.sender),
              console.log(authTokenId),
              (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === authTokenId ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      padding: '10px',
                      borderRadius: '10px',
                      backgroundColor: message.sender === authTokenId ? '#fdc7c7' : '#ebedeb',
                      color: '#000',
                      maxWidth: '80%',
                      margin: '5px',
                      textAlign: 'left',
                    }}
                  >
                    <p>{message.content}</p>
                  </Box>
                </Box>
              )
            )
          )}
        </Box>
        <Box id="newMessageGrid">
          <form id="newMessageForm" onSubmit={handleSubmitMessage}>
            <TextField
              className="inputMessage"
              fullWidth
              variant="outlined"
              placeholder="Write a new message..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <Button id="submitMessage" type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
