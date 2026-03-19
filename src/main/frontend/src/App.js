import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Results from './pages/Results';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          toastStyle={{ background: '#1e293b', border: '1px solid #334155' }}
        />
      </div>
    </Router>
  );
}

export default App;
