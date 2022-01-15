import React from 'react';
import { useSettings } from '../../../Settings';
import Offers from './offers/Offers';
import { Map } from './map/Map';
import './content.sass';

const Content = () => {
    const { offers } = useSettings();
    console.log(offers);

    return (
        <div className='main-content'>
            <Offers/>
            <Map/>
        </div>
    );
};

export default Content;