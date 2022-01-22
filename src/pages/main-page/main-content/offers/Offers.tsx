import React, { useState } from 'react';
import { useWindowSize } from '../../../../functions/handle-resize';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useSettings } from '../../../../Settings';
import MediaQuery from 'react-responsive';
import SortBy from '../../filter-bar/Buttons/sort-by/SortBy';
import OfferTab from './offer-tab/OfferTab';
import './offers.sass';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../../AuthContext';
import { OfferComponentType } from '../../../../types/offer-component';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Offers = ({ filtered, setOfferDetailData }: OfferComponentType) => {
    const size: ScreenSize = useWindowSize();
    const navigate = useNavigate();
    const { filters, setFilters, offers } = useSettings();
    const { loggedIn, email } = useAuth();

    const style = {
        minHeight: size.height - 200,
        maxHeight: size.height - 200,
        maxWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
        minWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
    };

    const [tabUserOffersActive, setTabUserOffersActive] = useState({
        withOutSalary: true,
        withSalary: false,
        userOffers: false,
    });

    return (
        <div className="offers">
            <div className='offers-menu'>
                <div className='left-side-buttons'>
                    <div
                        className={`${tabUserOffersActive.withSalary ? 'tab-active offers' : 'offers'}`}
                        onClick={() => {
                            setFilters({ ...filters, withSalary: true });
                            setTabUserOffersActive({
                                userOffers: false,
                                withOutSalary: false,
                                withSalary: true
                            });
                        }}
                    >
                        <MediaQuery minWidth={1025}>
                                <span className="tab-offers-text">
                                    Offers with salary
                                </span>
                        </MediaQuery>
                        <MediaQuery maxWidth={1025}>
                                <span>
                                    With salary
                                </span>
                        </MediaQuery>
                    </div>
                    <div
                        className={`${tabUserOffersActive.withOutSalary ? 'tab-active offers' : 'offers'}`}
                        onClick={() => {
                            setFilters({ ...filters, withSalary: false });
                            setTabUserOffersActive({
                                userOffers: false,
                                withOutSalary: true,
                                withSalary: false
                            });
                        }}
                    >
                        All offers
                    </div>
                    { loggedIn &&
                    <div
                        className={`${tabUserOffersActive.userOffers ? 'tab-active offers' : 'offers'}`}
                        onClick={() => {
                            setTabUserOffersActive({
                                userOffers: true,
                                withOutSalary: false,
                                withSalary: false
                            });
                        }}
                    >
                        Your offer
                    </div>
                    }
                </div>
                <div className="offers-menu-left-side">
                    <MediaQuery minWidth={1025}>
                        <SortBy/>
                    </MediaQuery>
                </div>
            </div>
            <div className="offers-content-3" style={style}>
                {
                     tabUserOffersActive.userOffers ?
                         offers?.map((item) => {
                             if (item.owner === email ){
                                 return item.employment_type.map((propsEmployment, index) => {
                                     if (index === 0) {
                                         return (
                                             <div className={'column'}>
                                                 <OfferTab  onClick={ () => { setOfferDetailData(item); navigate('/mainpage/details'); } }  props={item} propsEmployment={propsEmployment} key={item._id + uuidv4()}/>
                                                 <div className={'edit-remove'}>
                                                     <AddIcon  />
                                                     <RemoveIcon onClick={ () => navigate('/edit',  { state: { ...item } } ) }/>
                                                 </div>
                                             </div>
                                         );
                                     }
                                 });
                             }
                         })
                     :
                    filtered?.map((props) => {
                         return props.employment_type.map((propsEmployment, index) => {
                             if (index === 0) {
                                 return (
                                     <div onClick={ () => { setOfferDetailData(props); navigate('/mainpage/details'); } }>
                                         <OfferTab props={props} propsEmployment={propsEmployment} key={props._id + uuidv4()} />
                                     </div>
                                 );
                             }
                        });
                    })
                }
            </div>

        </div>
    );
};

export default Offers;