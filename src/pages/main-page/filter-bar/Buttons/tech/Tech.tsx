import React, { useState } from 'react';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import { useSettings } from '../../../../../Settings';
import { Dialog } from '@mui/material';
import TechPopOut from './TechPopOut';

const Tech = () => {
    const { filters } = useSettings();
    const [open, setOpen] = useState(false);

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
                filter={filters.mainTech === 'All'}
                childrens={filters.mainTech !== 'All' ? filters.mainTech : 'Tech' }
            />
            <Dialog fullScreen open={open}>
                <TechPopOut handleClose={handleClose} />
            </Dialog>
        </>
    );
};

export default Tech;