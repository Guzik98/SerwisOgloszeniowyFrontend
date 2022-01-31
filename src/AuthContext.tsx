import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { UserType } from './types/user';
import { userDefault } from './deflautValues/user-default';
import { checkUser } from './services/check-user';

export const AuthContext = createContext<AuthContextData | null>(null);

export const useAuthProviderSettings = () => {
    const [userData, setUserData] = useState<UserType>(userDefault);

    useEffect( () => {
        checkUser(setUserData);
    }, []);

    return {
        setUserData,
        userData,
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