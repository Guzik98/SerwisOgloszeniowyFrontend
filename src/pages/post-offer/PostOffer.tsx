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
                <Route path="personalinfo" element={<PersonalInfo type={'postoffer'}/>}/>
                <Route path="address" element={<Address type={'postoffer'}/>} />
                <Route path="contact" element={<Contact type={'postoffer'}/>} />
                <Route path="education" element={<Education type={'postoffer'} />} />
                <Route path="courses" element={<Courses type={'postoffer'}/>} />
                <Route path="experience" element={<Experience type={'postoffer'} />} />
                <Route path="project" element={<Projects type={'postoffer'}/>} />
                <Route path="programing" element={<Programing type={'postoffer'}/>} />
                <Route path="skills" element={<Skills type={'postoffer'} />} />
                <Route path="employment" element={<Employment type={'postoffer'} />} />
            </Routes>
    );
};

export default PostOffer;