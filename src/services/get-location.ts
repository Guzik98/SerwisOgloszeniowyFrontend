import axios from 'axios';
import { GeocodeType } from '../types/geocode';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const getLocation =  ( address: string, setGeocode: React.Dispatch<React.SetStateAction<GeocodeType>>)  =>  {
    const apiKey = '08082df1f65d43d5a6c8ed5af197306b';
    axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(address)}&limit=5&apiKey=${apiKey}`)
        .then((response) => {
            console.log(response);
            setGeocode({
                longitude: response.data.features[0].geometry.coordinates[0],
                latitude: response.data.features[0].geometry.coordinates[1]
            });
        })
};

export default getLocation;