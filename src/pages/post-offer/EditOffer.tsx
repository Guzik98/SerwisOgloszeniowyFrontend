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
            <Route path="personalinfo" element={<PersonalInfo type={'edit'} />} />
            <Route path="address" element={<Address type={'edit'}/>} />
            <Route path="contact" element={<Contact type={'edit'} />} />
            <Route path="education" element={<Education type={'edit'} />} />
            <Route path="courses" element={<Courses type={'edit'} />} />
            <Route path="experience" element={<Experience type={'edit'} />} />
            <Route path="projects" element={<Projects type={'edit'}/>} />
            <Route path="programing" element={<Programing type={'edit'} />} />
            <Route path="skills" element={<Skills type={'edit'} />} />
            <Route path="employment" element={<Employment  type={'edit'} />} />
        </Routes>
    );
};

export default EditOffer;