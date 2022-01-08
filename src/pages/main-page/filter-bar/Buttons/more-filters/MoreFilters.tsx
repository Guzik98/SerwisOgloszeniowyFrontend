import React from 'react';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useSettings } from '../../../../../Settings';
import { ScreenSize } from '../../../../../types/ScreenSize';
import { useWindowSize } from '../../../../../functions/handle-resize';
import MediaQuery from 'react-responsive';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { Dialog } from '@mui/material';
import { checkParametersIncrement } from './checkParametersIncrement';
import MoreFilersPopOut from './MoreFilersPopOut';
import './moreFilters.sass'


const MoreFilters = () => {
    const { filters } = useSettings();
    const size: ScreenSize = useWindowSize();
    const [open, setOpen] = React.useState(false);
    const counter = checkParametersIncrement(filters);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ButtonComponent
                onClick={handleClickOpen}
                width='132px'
                filter={(!(filters.fromSalary != 0 || filters.toSalary != 100000 ||
                    filters.employmentType != 'All' || filters.seniority != 'All'))}
                endIcon={ size.width > 1025 ? open ? <ExpandLess/> : <ExpandMore/> : <></> }
                startIcon={ counter > 0 ? <span className="numer-border"> {counter} </span>
                    : <MediaQuery minWidth={1025}>
                        <DensitySmallIcon/>
                    </MediaQuery>}
                children='More filters'
            />
            <MediaQuery maxWidth={1025}>
                <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <MoreFilersPopOut handleClose={handleClose}/>
                </Dialog>
            </MediaQuery>
            <MediaQuery minWidth={1025}>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                    <MoreFilersPopOut   handleClose={handleClose}/>
                </Dialog>
            </MediaQuery>
        </>
    );
};

export default MoreFilters;