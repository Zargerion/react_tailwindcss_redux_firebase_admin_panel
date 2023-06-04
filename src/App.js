import './App.css';
import './tailwind.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home_page.jsx';
import AdminPanel from './pages/admin_panel.jsx';
import ValidationPage from './pages/validation_page.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/validation" element={<ValidationPage/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </Router>
  );
}

export default App;
