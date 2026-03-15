import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home       from './pages/Home';
import Login      from './pages/Login';
import Signup     from './pages/Signup';
import FraudCheck from './pages/FraudCheck';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/"            element={<Home />}       />
          <Route path="/login"       element={<Login />}      />
          <Route path="/signup"      element={<Signup />}     />
          <Route path="/fraud-check" element={<FraudCheck />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;