import React from 'react';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import { useSettings } from '../../../../../Settings';
import { createStyles, makeStyles } from '@mui/styles';
import MediaQuery from 'react-responsive';
import { Dialog, Popover } from '@mui/material';
import SortByPopOut from './SortByPopOut';
import './sortBy.sass'
import { useWindowSize } from '../../../../../functions/handle-resize';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiPopover-paper': {
                margin: '0 6px 0 6px',
                textAlign: 'center',
                minWidth: 150,
                maxWidth: 150,
                padding: 0,
                overflow: 'none'
            },
        },
    }),
);


const SortBy = () => {
    const { filters } = useSettings();
    const classes = useStyles();
    const size = useWindowSize()

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('here');
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
                onClick={handleClick}
                filter={filters.sortBy === 'Latest'}
                children={filters.sortBy}
                endIcon={size.width > 1025 ? open ? <ExpandLess/> : <ExpandMore/> : undefined}
            />
            <MediaQuery maxWidth={1025}>
                <Dialog fullScreen aria-labelledby="customized-dialog-title" open={open}>
                    <SortByPopOut handleClose={handleClose}/>
                </Dialog>
            </MediaQuery>
            <MediaQuery minWidth={1025}>
                <Popover
                    classes={{ root: classes.root}}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <SortByPopOut handleClose={handleClose}/>
                </Popover>
            </MediaQuery>
        </>
    );
};

export default SortBy;