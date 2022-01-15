import React from 'react';
import { OfferType } from '../../../../../types/offer';
import { useSettings } from '../../../../../Settings';
import MediaQuery from 'react-responsive';
import { EmploymentType } from '../../../../../types/offer/employment';
import { getNumberOfDays } from './get-numbers-of-days';
import { SkillsType } from '../../../../../types/offer/skill';
import CompanyIconOffer from '../../../../../assets/icons/CompanyIconOffer';
import PointerIconOffer from '../../../../../assets/icons/PointerIconOffer';
import './offer-tab.sass';

type OffersTab = {
    props: OfferType
    propsEmployment: EmploymentType,
};

const OfferTab = ({ props, propsEmployment }: OffersTab ) => {
    const { setViewport } = useSettings();
    const today = new Date().toISOString().split('T')[0];

    const setViewportFunction = () => {
        setViewport({
            latitude: +props.latitude,
            longitude: +props.longitude,
            width: '100%',
            height: '98%',
            zoom: 16,
        });
    };

    return (
        <div className="offer-border"
             onClick={  () => { setViewportFunction(); }}
        >
            <div className="offer-border-level2">
                <div className="offer-border-level3">
                    <div className="logo">
                        <div className="logo-border">
                            <img
                                src={props.photo_url}
                                alt={props.title} className="image"/>
                        </div>
                    </div>

                    <div className="info">
                        <div className="top-info">
                            <div className="position-info">
                                <div className="position">
                                    <div className="position-text">
                                        {props.title + ' ' + 'Exp' + ' ' + props.experience_level}
                                    </div>
                                </div>
                            </div>
                            <div className="salary-info">
                                <MediaQuery minWidth={1025}>
                                    <div className="salary-text">
                                        { propsEmployment.salary !== null ? propsEmployment.salary?.from.toString().slice(0, -3) + ' ' + propsEmployment.salary?.from.toString().slice(-3) + ' - '
                                            + propsEmployment.salary?.to.toString().slice(0, -3) + ' ' + propsEmployment.salary?.to.toString().slice(-3)  + ' '
                                            : 'Undisclosed Salary' }
                                    </div>
                                </MediaQuery>
                            </div>
                            <div className="update-info">
                                {getNumberOfDays(props.published_at, today)}
                            </div>
                        </div>
                        <div className="bottom-info">
                            <div className="bottom-info-left">
                                <div className="company-name">
                                    <CompanyIconOffer/>
                                    {props.name}
                                </div>
                                <div className="where-type">
                                    <MediaQuery minWidth={1025}>
                                        <PointerIconOffer/>
                                        <span className="where">
                                            {props.city}
                                        </span>
                                    </MediaQuery>

                                    <MediaQuery maxWidth={1025}>
                                        <div className="salary-text">
                                            { propsEmployment.salary !== null ?
                                                propsEmployment.salary?.from.toString().slice(0, -3) + 'k - '
                                                + propsEmployment.salary?.to.toString().slice(0, -3) + 'k '
                                                // + propsEmployment.salary?.currency.toUpperCase()
                                                : 'Undisclosed Salary' }
                                        </div>
                                    </MediaQuery>
                                </div>
                            </div>
                            <div className="bottom-info-skills">
                                <MediaQuery minWidth={1025}>
                                    {props.skills.map((type: SkillsType) =>
                                        <span key={ type.name } className="skills">{type.name}</span>
                                    )}
                                </MediaQuery>
                            </div>
                            <div className="bottom-info-where">
                                <MediaQuery maxWidth={1025}>
                                    <span className="where">
                                            {props.city}
                                        </span>
                                    <PointerIconOffer/>
                                </MediaQuery>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferTab;