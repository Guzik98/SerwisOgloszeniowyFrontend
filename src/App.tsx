import React from 'react';
import './App.css';
import { useAuth } from './AuthContext';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PostOffer from './pages/post-offer/PostOffer';
import MainPage from './pages/main-page/MainPage';

function App() {
    const { loggedIn } = useAuth();

    const RequireAuth = () => {
        if (!loggedIn) {
            return <Navigate to="/login" />;
        }
        return <Outlet />;
    };


    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<MainPage/>} />
                <Route path="/mainpage/*" element={<MainPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route element={<RequireAuth/>} >
                    <Route path="/postoffer/*" element={<PostOffer/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
