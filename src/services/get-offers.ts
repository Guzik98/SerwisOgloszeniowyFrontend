import axios from 'axios';
import React from 'react';
import { OfferType } from '../types/offer';

export const getOffers = ( setOffers: React.Dispatch<React.SetStateAction<OfferType[] | undefined>> ) => {
    axios.get('http://localhost:3000/offer')
        .then((response) => {
            return setOffers(response.data);
        });
};