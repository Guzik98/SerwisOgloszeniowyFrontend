import React from 'react';
import MediaQuery from 'react-responsive';
import { PopOutButtons, sortByButtons } from './PopOutButtons';
import { DialogContent, DialogTitle, Divider } from '@mui/material';
import { HandlePopOut } from '../../../../../types/pop0ut';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export type ButtonType = {
    name: string;
};

const SortByPopOut = ({ handleClose }: HandlePopOut): JSX.Element => {
    return (
        <>
            <MediaQuery maxWidth={1025}>
                <DialogTitle>
                    <div className="sort-by-title">
                        <span>Sort By</span>
                        <HighlightOffIcon onClick={handleClose}/>
                    </div>
                </DialogTitle>
            </MediaQuery>
            <Divider/>

            <DialogContent>
                <div className="sort-by-pop-out-body">
                    {sortByButtons.map(({ name }: ButtonType) =>
                        <div onClick={handleClose} key={name} className="btn-border">
                            <PopOutButtons
                                name={name} key={name}/>
                        </div>)
                    }
                </div>
            </DialogContent>
        </>
    );
};

export default SortByPopOut;