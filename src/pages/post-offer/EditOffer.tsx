import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import Address from './pages/Address';
import PersonalInfo from './pages/PersonalInfo';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Courses from './pages/Courses';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Employment from './pages/Employment';
import Programing from './pages/Programing';
import { OfferType } from '../../types/offer';
import { updateOffer } from './state-machine/yourDetailsAction';
import { SendOfferType } from '../../enums/send-offer-type';

const EditOffer = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const { actions } = useStateMachine({ updateOffer });

    useEffect(() => {
        const offer: OfferType = location.state as OfferType;
        console.log('here');
        navigate('personalinfo');
        actions.updateOffer({
            photo: undefined,
            ...offer
        });
    }, []);

    return (
        <Routes>
            <Route path="personalinfo" element={<PersonalInfo type={SendOfferType.EDIT} />} />
            <Route path="address" element={<Address type={SendOfferType.EDIT}/>} />
            <Route path="contact" element={<Contact type={SendOfferType.EDIT} />} />
            <Route path="education" element={<Education type={SendOfferType.EDIT} />} />
            <Route path="courses" element={<Courses type={SendOfferType.EDIT} />} />
            <Route path="experience" element={<Experience type={SendOfferType.EDIT} />} />
            <Route path="project" element={<Projects type={SendOfferType.EDIT}/>} />
            <Route path="programing" element={<Programing type={SendOfferType.EDIT} />} />
            <Route path="skills" element={<Skills type={SendOfferType.EDIT} />} />
            <Route path="employment" element={<Employment  type={SendOfferType.EDIT} />} />
        </Routes>
    );
};

export default EditOffer;