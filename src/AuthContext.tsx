import React, { createContext, FC, useContext, useState } from 'react';

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AuthContext = createContext<AuthContextData | null>(null);


export const useAuthProviderSettings = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        sleep(2000).then(() => setLoggedIn(true));
    }
    const logout = () => {
        sleep(2000).then(() => setLoggedIn(false));
    }
    return {
        login,
        loggedIn,
        logout
    }
}

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