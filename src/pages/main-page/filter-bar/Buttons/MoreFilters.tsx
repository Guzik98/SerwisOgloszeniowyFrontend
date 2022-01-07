import React from 'react';
import ButtonComponent from '../../../../common/components/ButtonComponent';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useSettings } from '../../../../Settings';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useWindowSize } from '../../../../functions/handle-resize';
import MediaQuery from 'react-responsive';
import IconPath from '../../../../assets/icons/IconPath';
import { checkParametersIncrement } from './checkParametersIncrement';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

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
        <ButtonComponent
            onClick={() => handleClickOpen}
            filter={(!(filters.fromSalary != 0 || filters.toSalary != 100000 ||
                filters.employmentType != 'All' || filters.seniority != 'All'))}
            endIcon={ size.width > 1025 ? open ? <ExpandLess/> : <ExpandMore/> : <></> }
            startIcon={ counter > 0 ? <span className="numer-border"> {counter} </span>
                : <MediaQuery minWidth={1025}>
                    <DensitySmallIcon/>
                </MediaQuery>}
         children='More filters'
        />
    );
};

export default MoreFilters;