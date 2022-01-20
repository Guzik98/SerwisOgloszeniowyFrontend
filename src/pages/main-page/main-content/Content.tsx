import React, { useState } from 'react';
import Offers from './offers/Offers';
import { Map } from './map/Map';
import './content.sass';
import { filterFunction } from '../../../functions/filtering';
import Loading from './loading/Loading';

import { OfferType } from '../../../types/offer';
import { Route, Routes } from 'react-router-dom';
import OfferDetail from './offer-detail/OfferDetail';

const Content = () => {
    const filtered = filterFunction();

    const [offerDetailData, setOfferDetailData] = useState<OfferType>();

    return (
        <div className='main-content'>
            { filtered !== undefined
                ? <>
                    <Routes>
                        <Route path="/" element={<Offers filtered={filtered} setOfferDetailData={setOfferDetailData}/>}/>
                        {offerDetailData
                            ? <Route path="details" element={<OfferDetail offerDetailData={offerDetailData}/>}/>
                            : <Route path="details" element={<Loading/>}/>
                        }
                    </Routes>
                    <Map filtered={filtered}/>
                    </>
                : <Loading/>
            }
        </div>
    );
};

export default Content;