import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './components/MainPage.js';
import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
