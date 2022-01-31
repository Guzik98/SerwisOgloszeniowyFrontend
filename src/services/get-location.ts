import axios from 'axios';
import { GeocodeType } from '../types/geocode';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

const getLocation =  ( address: string, setGeocode: React.Dispatch<React.SetStateAction<GeocodeType>>, navigate: NavigateFunction)  =>  {
    axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(address)}&limit=5&apiKey=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            setGeocode({
                longitude: response.data.features[0].geometry.coordinates[0],
                latitude: response.data.features[0].geometry.coordinates[1]
            });
        }).catch(() => {
            console.log('here3');
            navigate('/postoffer/address');
    });

};

export default getLocation;