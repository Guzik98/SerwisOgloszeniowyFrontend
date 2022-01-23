import React from 'react';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ScreenSize } from '../../../../../types/ScreenSize';
import { useWindowSize } from '../../../../../functions/handle-resize';
import { useSettings } from '../../../../../Settings';
import { createStyles, makeStyles } from '@mui/styles';
import MediaQuery from 'react-responsive';
import {  Dialog, Popover } from '@mui/material';
import { PopOverLocation } from './LocationPopOver';


export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiPopover-paper': {
                margin: 0,
                minWidth: 650,
                padding: 0,
                '@media (max-width: 1025px)': {
                    minWidth: '100%',
                    minHeight: '100%',
                    top: '0px!important',
                    left: '0px!important',
                    display: 'unset'
                },
            },
            '& .MuiTypography-body1' : {
                width: 650,
                height: '100%',
                '@media (max-width: 1025px)':  {
                    minWidth: '100%',
                    minHeight: '100%',
                    position: 'relative',
                    padding: 0
                },
            },
        }
    })
);

const Location = (): JSX.Element => {
    const classes = useStyles();
    const size: ScreenSize = useWindowSize();
    const { filters } = useSettings();
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <ButtonComponent
                width={ size.width > 1025 ? '160px' : undefined }
                filter={filters.city === 'All'}
                onClick={handleClick}
                justifyContent={'space-between'}
                role='open-location-pop-out'
                childrens={filters.city !== 'All' ? filters.city : 'Location' }
                endIcon={ size.width > 1025 ? open ? <ExpandLess/> : <ExpandMore/> : <></> }
            />

            <MediaQuery maxWidth={1025}>
                <Dialog
                    classes={{ root: classes.root }}
                    id={id}
                    open={open}
                    fullScreen
                    onClose={handleClose}
                >
                    <PopOverLocation  handleClose={ handleClose }/>
                </Dialog>
            </MediaQuery>
            <MediaQuery minWidth={1025}>
                <Popover
                    classes={{ root: classes.root }}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <PopOverLocation handleClose={ handleClose }/>
                </Popover>
            </MediaQuery>
        </>
    );
};

export default Location;