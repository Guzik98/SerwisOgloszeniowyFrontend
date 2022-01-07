import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { ButtonComponentType } from '../../types/button-component';

export const useStyles = makeStyles(() =>
    createStyles({
        chose: {
            borderRadius: '32px',
            textTransform: 'none',
            fontSize: '12px',
            color: 'rgb(119, 119, 119)',
            background: 'rgb(255, 255, 255)',
            border: '1px solid #E4E8F0',
            minWidth: '160px',
            justifyContent: 'space-between',
            marginTop: 6,
            padding: '0px 16px 0px 16px',
            height: 36,
            '@media (max-width: 1025px)': {
                fontSize: 12,
                minWidth: 'fit-content',
                margin: '10px 5px 10px 0px',
                borderColor: 'rgb(228, 232, 240)',
            }
        },
        chosen: {
            borderRadius: '32px',
            textTransform: 'none',
            fontSize: '14px',
            color: 'rgb(255, 64, 129)',
            background: 'rgba(255, 64, 129, 0.08)',
            borderColor: 'rgb(255, 64, 129)',
            minWidth: '160px',
            justifyContent: 'space-between',
            marginTop: 6,
            padding: '0px 16px 0px 16px',
            height: 36,
            '@media (max-width: 1025px)': {
                minWidth: 'fit-content',
                margin: '10px 5px 10px 0px'
            }
        },
        label: {
            textTransform: 'none',
            fontWeight: 500,
            fontFamily: 'Open Sans,sans-serif',
        },
    }),
);




const ButtonComponent = ({ onClick, children, filter, endIcon, startIcon }: ButtonComponentType ): JSX.Element => {
    const classes = useStyles();

    return (
         <Button
             size='small'
             variant='outlined'
             onClick={() => onClick }
             classes={ filter ? { root: classes.chose } : { root: classes.chosen }}
             endIcon={endIcon}
             startIcon={startIcon}
         >
             {children}
         </Button>
    );
};

export default ButtonComponent;