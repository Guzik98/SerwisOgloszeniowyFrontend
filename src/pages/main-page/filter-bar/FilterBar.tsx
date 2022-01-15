import React from 'react';
import { programingLanguageIconArray } from '../../../common/components/programingLanguageArray';
import { useSettings } from '../../../Settings';
import Location from './Buttons/Location/Location';
import MoreFilters from './Buttons/more-filters/MoreFilters';
import './filter-bar.sass';
import AllIcon from './Buttons/All-icon';
import MediaQuery from 'react-responsive';
import Tech from './Buttons/tech/Tech';
import SortBy from './Buttons/sort-by/SortBy';

const FilterBar = (): JSX.Element => {
    const { setFilters, filters } = useSettings();
    return (
        <div className="filter-bar">
            <div className="filter-bar-elements">
                <Location/>
                <MediaQuery maxWidth={1025}>
                    <Tech/>
                </MediaQuery>
                <div className="icon-bar">
                    <MediaQuery minWidth={1025}>
                        <div onClick={() => setFilters( { ...filters, mainTech: 'All' })}
                             className = {`${ filters.mainTech !== 'All' ?  'un-active' : '' }`}
                        >
                            <AllIcon/>
                        </div>
                        {programingLanguageIconArray.map((item) => {
                            return (
                                <div onClick={() => setFilters( { ...filters, mainTech: item.value })}
                                     className = {`${filters.mainTech !== item.value && filters.mainTech !== 'All' ?  'un-active' : '' }`}
                                     key={item.value}
                                >
                                    <div className = 'icon'>
                                <span className='circle'>
                                    {item.icon}
                                </span>
                                        <span className='under-icon'>
                                    {item.name}
                                </span>
                                    </div>
                                </div>
                            );
                        })}
                    </MediaQuery>
                </div>
                <MoreFilters/>
                <MediaQuery maxWidth={1025}>
                    <SortBy/>
                </MediaQuery>
            </div>
        </div>
    );
};

export default FilterBar;