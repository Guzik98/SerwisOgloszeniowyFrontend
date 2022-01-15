import axios from 'axios';
import React from 'react';

export const loginRequest =  ( email: string, password: string,
                             setErrorMessageFromBackend: React.Dispatch<React.SetStateAction<string | undefined>> ) => {
    const url = 'http://localhost:3000/auth/signin';
     axios.post(url,  {
        email: email,
        password: password
    })
    .then( (response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        setErrorMessageFromBackend('logged');
    })
    .catch( (error) => {
        setErrorMessageFromBackend(error.response.data.message);
    });
};
