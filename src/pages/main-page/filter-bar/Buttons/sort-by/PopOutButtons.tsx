import { Button } from '@mui/material';
import React from 'react';
import MediaQuery from 'react-responsive';
import { useSettings } from '../../../../../Settings';
import { createStyles, makeStyles } from '@mui/styles';
import { SortByEnum } from '../../../../../enums/sortby-enum';
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '@media (min-width: 1025px)': {
                minWidth: 100,
                color: 'rgb(119, 119, 119)',
                whiteSpace: 'nowrap',
                margin: 6,
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
    { name: 'latest', value: SortByEnum.LATEST },
    { name: 'highest Salary', value: SortByEnum.HIGHEST },
    { name: 'lowest Salary', value: SortByEnum.LOWEST },
];


export const PopOutButtons = (props: { name: string, value: SortByEnum }): JSX.Element=> {
    const classes = useStyles();
    const { filters, setFilters } = useSettings();


    const handleClose = () => {
        setFilters({ ...filters, sortBy: props.value });
    };

    return (
        <>
            <MediaQuery maxWidth={1025}>
                <div className={`${ filters.sortBy ===  props.value ? 'sort-active sort-by-link' : 'sort-by-link' }` }>
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
                <div className={`${ filters.sortBy ===  props.value ? 'false sort-by-link' : 'sort-by-link' }` }>
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
