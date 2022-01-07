import React from 'react';
import './header.sass';
import { SubmitButtonStyled } from '../../../common/component-styles/ButtonStyle';
import { useAuth } from '../../../AuthContext';
import {  IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { StyledDivider } from '../../../common/component-styles/Divider';


const Header = () => {

    const { username } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="header-container">
                <div className="logo-border">
                    <a className="logo-button">
                        Serwis ogloszeniowy
                    </a>
                </div>
                <div className='left-end'>
                    <StyledDivider  orientation="vertical" flexItem/>
                    { username ? <SubmitButtonStyled >{username}</SubmitButtonStyled> : <SubmitButtonStyled>Sign IN</SubmitButtonStyled>}
                    <StyledDivider orientation="vertical" flexItem/>
                    <SubmitButtonStyled onClick={() =>  navigate('/postoffer')}>
                        Post a offer
                    </SubmitButtonStyled>
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