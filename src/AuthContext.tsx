import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { sleep } from './functions/sleep';
import { parseJwt } from './functions/decode-acces-token';

export const AuthContext = createContext<AuthContextData | null>(null);

export const useAuthProviderSettings = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>();
    const [email, setEmail] = useState<string>();
    // const [iat, setIat] = useState<number | undefined>()
    // const [exp, setExp] = useState<number | undefined>();

    const getLocalStorage = () => {
        setUsername(parseJwt(localStorage.getItem('accessToken') as string).username);
        setEmail(parseJwt(localStorage.getItem('accessToken') as string).email);
        // setIat(parseJwt(localStorage.getItem('accessToken') as string).iat);
        // setExp(parseJwt(localStorage.getItem('accessToken') as string).exp);
    };

    useEffect(() => {
        // Pull saved login state from localStorage / AsyncStorage
        if (localStorage.getItem('accessToken') !== null){
            setLoggedIn(true);
            getLocalStorage();
        }
    }, []);

    // useEffect(() => {
    //     if (exp !== undefined && iat !== undefined) {
    //         while (iat < exp ){
    //             sleep(1000).then(() => setIat(iat + 1))
    //         }
    //         if (iat == exp){
    //             logout()
    //         }
    //     }
    // },[exp])

    const login = () => {
        sleep(2000).then(() => {
            setLoggedIn(true);
            getLocalStorage();
        });
    };

    const logout = () => {
        console.log('logout');
        sleep(2000).then(() => {
            setLoggedIn(false);
            setUsername(undefined);
        });
    };

    return {
        login,
        loggedIn,
        logout,
        username,
        email
    };
};

export const AuthContextProvider: FC = ({ children }) => {
    const value = useAuthProviderSettings();

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

type AuthContextData = ReturnType<typeof useAuthProviderSettings>;

export const useAuth = (): AuthContextData => {
    const AuthSettings = useContext(AuthContext);

    if (!AuthSettings) {
        throw new Error('useAuthSettings must by used inside AuthSettings');
    }

    return AuthSettings;
};