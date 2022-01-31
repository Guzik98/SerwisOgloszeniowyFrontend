import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { updateOffer } from './state-machine/yourDetailsAction';
import { ExperienceLevelEnum } from '../../enums/experience_level';
import { useAuth } from '../../AuthContext';
import { SendOfferType } from '../../enums/send-offer-type';

const PostOffer = (): JSX.Element => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { actions } = useStateMachine({ updateOffer });

    useEffect(()=> {
        navigate('personalinfo');
        actions.updateOffer({
            _id: null,
            certificate: null,
            city: '',
            country_code: 'PL',
            education: null,
            email: userData.email,
            employment_type: [],
            experience: null,
            experience_level: ExperienceLevelEnum.JUNIOR,
            github_url: null,
            language: [],
            latitude: '',
            linkedin_url: null,
            longitude: '',
            marker_icon: '',
            name: userData.username,
            phone_number: 0,
            photo: undefined,
            photo_url: null,
            project: null,
            short_personal_description: '',
            skills: [],
            street: '',
            surname: ''

        });
    }, []);

    return (
            <Routes>
                <Route path="personalinfo" element={<PersonalInfo type={SendOfferType.POST}/>}/>
                <Route path="address" element={<Address type={SendOfferType.POST}/>} />
                <Route path="contact" element={<Contact type={SendOfferType.POST}/>} />
                <Route path="education" element={<Education type={SendOfferType.POST} />} />
                <Route path="courses" element={<Courses type={SendOfferType.POST}/>} />
                <Route path="experience" element={<Experience type={SendOfferType.POST} />} />
                <Route path="project" element={<Projects type={SendOfferType.POST}/>} />
                <Route path="programing" element={<Programing type={SendOfferType.POST}/>} />
                <Route path="skills" element={<Skills type={SendOfferType.POST} />} />
                <Route path="employment" element={<Employment type={SendOfferType.POST} />} />
            </Routes>
    );
};

export default PostOffer;