import React from 'react';
import './header.sass';
import { SubmitButtonStyled } from '../../../common/component-styles/ButtonStyle';
import { useAuth } from '../../../AuthContext';
import {  IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { StyledDivider } from '../../../common/component-styles/Divider';
import { UpperCase } from '../../../functions/upperCase';
import { logoutUser } from '../../../services/logout';

const Header = (): JSX.Element => {
    const { userData, setUserData } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="header-container">
                <div className='right-side'>
                    <div className="logo-border">
                        <a className="logo-button">
                            Serwis ogloszeniowy
                        </a>
                    </div>
                    #1 Job Board for IT industry in Poland
                </div>
                <div className='left-end'>
                    { userData.loggedIn &&
                        <>
                            <StyledDivider  orientation="vertical" flexItem/>
                            <SubmitButtonStyled onClick={() => {
                                logoutUser(setUserData);
                            }
                            }>Log out</SubmitButtonStyled>
                        </>
                    }
                    <StyledDivider  orientation="vertical" flexItem/>
                    { userData.loggedIn
                        ? <SubmitButtonStyled >{ UpperCase(userData.username) }</SubmitButtonStyled>
                        : <SubmitButtonStyled onClick={() => navigate('/login')}>Sign in</SubmitButtonStyled>}
                    { userData.loggedIn &&
                        <>
                            <StyledDivider orientation="vertical" flexItem/>
                            <SubmitButtonStyled onClick={() =>  navigate('/postoffer')}>
                                Post offer
                            </SubmitButtonStyled>
                        </>
                    }
                    <StyledDivider  orientation="vertical" flexItem/>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Header;