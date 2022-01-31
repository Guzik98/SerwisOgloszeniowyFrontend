import axios from 'axios';
import React from 'react';
import { UserType } from '../types/user';
import { userDefault } from '../deflautValues/user-default';

export const logoutUser = ( setUserData: React.Dispatch<React.SetStateAction<UserType>>) => {
    const url = 'http://localhost:3000/auth/logout';
    axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }).then(() => {
        setUserData(userDefault);
    });
};