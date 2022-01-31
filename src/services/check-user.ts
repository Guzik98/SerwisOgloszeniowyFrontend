import axios from 'axios';
import { UserType } from '../types/user';
import React from 'react';
import { userDefault } from '../deflautValues/user-default';

export const checkUser = ( setUserData: React.Dispatch<React.SetStateAction<UserType>>) => {
    const url = 'http://localhost:3000/auth/user';
    axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    })
        .then((response) => {
            setUserData({
                loggedIn: true,
                email: response.data.email,
                username: response.data.username
            });
        })
        .catch(() => {
            setUserData(userDefault);
        });
};