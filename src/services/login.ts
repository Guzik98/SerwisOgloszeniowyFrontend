import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const login = async ( email: string, password: string,
                             setErrorMessageFromBackend: React.Dispatch<React.SetStateAction<string | undefined>> ): Promise<void> => {
    const url = 'http://localhost:3000/auth/signin'
    await axios.post(url,{
        email: email,
        password: password
    })
    .then( (response) => {
        setErrorMessageFromBackend('logged');
        console.log(response);
    })
    .catch( (error) => {
        setErrorMessageFromBackend(error.response.data.message);
    })
}