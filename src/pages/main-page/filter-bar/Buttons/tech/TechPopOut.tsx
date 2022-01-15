import React from 'react';
import { HandlePopOut } from '../../../../../types/pop0ut';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { programingLanguageIconArray } from '../../../../../common/components/programingLanguageArray';
import { useSettings } from '../../../../../Settings';
import './tech.sass';
import { Divider } from '@mui/material';
import AllIcon from '../All-icon';

const TechPopOut = ({ handleClose } : HandlePopOut) : JSX.Element => {
    const { setFilters, filters } = useSettings();

    return (
        <>
            <div className="tech-pop-out-title">
                Technology
                <div className="exit-icon" onClick={ handleClose }>
                    <HighlightOffIcon/>
                </div>
            </div>
            <Divider/>
            <div className="tech-pop-out-content">
                <div onClick={() => setFilters( { ...filters, mainTech: 'All' })}
                     className = {`${ filters.mainTech !== 'All' ?  'un-active' : '' }`}
                >
                    <AllIcon/>
                </div>
                {programingLanguageIconArray.map((item) =>{
                    return (
                        <div onClick={handleClose} className="tech" key={item.value}>
                            <div
                                onClick={() => {setFilters({ ...filters, mainTech: item.value });}}
                                className = {`${filters.mainTech !== item.value && filters.mainTech != 'All' ? 'un-active' : '' }` }
                            >
                                <div
                                    className="icon"
                                    key={item.name}>
                            <span className="circle">
                                {item.icon}
                            </span>
                                    <span className="under-icon">
                                {item.name}
                            </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>

    );
};

export default TechPopOut;