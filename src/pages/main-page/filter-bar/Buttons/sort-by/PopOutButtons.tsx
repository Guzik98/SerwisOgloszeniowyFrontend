import { Button } from '@mui/material';
import React from 'react';
import MediaQuery from 'react-responsive';
import { useSettings } from '../../../../../Settings';
import { createStyles, makeStyles } from '@mui/styles';
import { ButtonType } from './SortByPopOut';

const useStyles = makeStyles(() =>
    createStyles({
        label: {
            whiteSpace: 'nowrap',
            textTransform: 'none',
            margin: 6,
        },
        root: {
            '@media (min-width: 1025px)': {
                minWidth: 100,
            },
            '@media (max-width: 1025px)': {
                display: 'flex',
                width: '100%',
                borderRadius: '32px',
                textTransform: 'none',
                fontSize: '14px',
                color: 'rgb(119, 119, 119)',
                background: 'rgb(255, 255, 255)',
                borderColor: 'rgb(228, 232, 240)',
                border: '1px solid',
                margin: '8px 0',
                height: '34px',
            }
        }
    }),
);

export const sortByButtons = [
    { name: 'Latest' },
    { name: 'Highest Salary' },
    { name: 'Lowest Salary' },
];


export const PopOutButtons = (props : ButtonType): JSX.Element=> {
    const classes = useStyles();
    const { filters, setFilters } = useSettings();


    const handleClose = () => {
        setFilters({...filters, sortBy: props.name})
    };

    return (
        <>
            <MediaQuery maxWidth={1025}>
                <div className={`${ filters.sortBy ===  props.name ? 'sort-active sort-by-link' : 'sort-by-link' }` }>
                    <Button
                        onClick={handleClose}
                        classes={{
                            root: classes.root,
                        }}>
                        {props.name}
                    </Button>
                </div>
            </MediaQuery>
            <MediaQuery minWidth={1025}>
                <div className={`${ filters.sortBy ===  props.name ? 'false sort-by-link' : 'sort-by-link' }` }>
                    <Button
                        onClick={handleClose}
                        classes={{
                            root: classes.root,
                        }}>
                        {props.name}
                    </Button>
                </div>
            </MediaQuery>
        </>
    );
};
