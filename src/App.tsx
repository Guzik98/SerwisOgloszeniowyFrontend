import React from 'react';
import './App.css';
import Login from './pages/login/Login';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </div>
  );
}

export default App;
