import axios from 'axios';
import React from 'react';

export const registerRequest =  (
    name: string,
    email: string,
    password: string,
    setErrorMessageFromBackend: React.Dispatch<React.SetStateAction<string | undefined>> ): void => {
    const url = 'http://localhost:3000/auth/signup';
    axios.post(url, {
        username: name,
        email: email,
        password: password,
        role: 'EMPLOYEE'
    })
        .then(() => {
            setErrorMessageFromBackend('success');
        })
        .catch( (error) => {
            setErrorMessageFromBackend(error.response.data.message);
        });
};
