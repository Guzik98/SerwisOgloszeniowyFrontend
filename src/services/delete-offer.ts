import axios from 'axios';
import { getOffers } from './get-offers';
import { OfferType } from '../types/offer';
import React from 'react';

export const deleteOffer = (_id: string, setOffers:  React.Dispatch<React.SetStateAction<OfferType[] | undefined>>) => {
    const url = `http://localhost:3000/offer/${_id}`;
    axios.delete(url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    }).then(() => {
        getOffers(setOffers);
    }).catch((error) => {
        console.log(error);
    });
};