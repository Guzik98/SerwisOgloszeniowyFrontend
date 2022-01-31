import React from 'react';
import './App.css';
import { useAuth } from './AuthContext';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PostOffer from './pages/post-offer/PostOffer';
import MainPage from './pages/main-page/MainPage';
import EditOffer from './pages/post-offer/EditOffer';

function App() {
    const { userData } = useAuth();

    const RequireAuth = () => {
        if (!userData.loggedIn) {
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
                <Route element={<RequireAuth/>} >
                    <Route path="/edit/*" element={<EditOffer/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
