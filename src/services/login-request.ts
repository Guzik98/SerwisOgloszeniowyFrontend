import axios from 'axios';
import React from 'react';
import { checkUser } from './check-user';
import { UserType } from '../types/user';

export const loginRequest = (
    email: string,
    password: string,
    setErrorMessageFromBackend: React.Dispatch<React.SetStateAction<string | undefined>>,
    setUserData: React.Dispatch<React.SetStateAction<UserType>>
) => {
    const url = 'http://localhost:3000/auth/signin';
     axios.post(url, {
         email: email,
         password: password
    }, {
         headers: { 'Content-Type': 'application/json' },
         withCredentials: true,
     }).then(() => {
        checkUser(setUserData);
        setErrorMessageFromBackend('logged');
    }).catch( (error) => {
        setErrorMessageFromBackend(error.response.data.message);
    });
};
