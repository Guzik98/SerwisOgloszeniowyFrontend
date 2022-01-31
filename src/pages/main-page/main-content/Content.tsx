import React, { useState } from 'react';
import Offers from './offers/Offers';
import { Map } from './map/Map';
import './content.sass';
import { filterFunction } from '../../../functions/filtering';
import Loading from './loading/Loading';
import { OfferType } from '../../../types/offer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import OfferDetail from './offer-detail/OfferDetail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSettings } from '../../../Settings';

const Content = () => {
    const { filters, offers } = useSettings();
    const { setViewport, viewport } = useSettings();
    const navigate = useNavigate();

    const filtered = filterFunction(filters, offers);

    const [offerDetailData, setOfferDetailData] = useState<OfferType>();

    return (
        <div className='main-content'>
            {offerDetailData &&
                <div className='back'>
                    <ArrowBackIcon sx={{ color: 'white' }}  onClick={() => {
                        navigate('/mainpage');
                        setViewport({
                            ...viewport,
                            latitude: 52.237049,
                            longitude: 21.017532,
                            zoom: 5,
                        });
                    }}/>
                </div>
            }
            { filtered !== undefined
                ? <>
                    <Routes>
                        <Route path="/" element={<Offers filtered={filtered} setOfferDetailData={setOfferDetailData}/>}/>
                        {offerDetailData
                            ? <Route path="details" element={<OfferDetail offerDetailData={offerDetailData}/>}/>
                            :   <Route path="details" element={<Loading/>}/>
                        }
                    </Routes>
                    <Map filtered={filtered} setOfferDetailData={setOfferDetailData}/>
                    </>
                : <Loading/>
            }
        </div>
    );
};

export default Content;