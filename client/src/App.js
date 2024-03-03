import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage.js';
import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';
import ChatPage from './components/ChatPage.js';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='chats' element={<ChatPage />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
