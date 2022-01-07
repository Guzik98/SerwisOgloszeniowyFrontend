import React from 'react';
import LocationButton from './Buttons/LocationButton';
import MoreFilters from './Buttons/MoreFilters';

const FilterBar = () => {

    return (
        <div className="filter-bar">
            <div className="filter-bar-elements">
                <LocationButton/>
                <MoreFilters/>
            </div>
        </div>
    );
};

export default FilterBar;