import { OfferType } from "./offer";
import React from 'react';

export type OfferComponentType = {
    filtered: OfferType[]
    setOfferDetailData: React.Dispatch<React.SetStateAction<OfferType | undefined>>
}