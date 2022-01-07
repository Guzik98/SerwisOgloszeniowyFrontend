import React from 'react';
import ButtonComponent from '../../../../common/components/ButtonComponent';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useWindowSize } from '../../../../functions/handle-resize';
import { useSettings } from '../../../../Settings';

const LocationButton = () => {
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

    return (
        <ButtonComponent
            onClick={() => handleClick}
            filter={filters.city === 'All'}
            children={filters.city !== 'All' ? filters.city : 'Location' }
            endIcon={ size.width > 1025 ? open ? <ExpandLess/> : <ExpandMore/> : <></> }
        />
    );
};

export default LocationButton;