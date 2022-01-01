import React, { FC } from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const MainPage: FC = () => {
    const { loggedIn, username } = useAuth();
    return (
        <div>
            {loggedIn}
            {username}
            <Link to={'/postoffer'}>
                <Button>
                    DON &apos; T HAVE AN ACCOUNT? SIGN UP NOW!
                </Button>
            </Link>
        </div>
    );
};

export default MainPage;