import React, { useEffect } from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import { StateMachineProvider } from 'little-state-machine';
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

const PostOffer = (): JSX.Element => {
    const navigate = useNavigate();

    useEffect(()=> {
        navigate('personalinfo');
    }, []);

    return (
        <StateMachineProvider>
            <Routes>
                <Route path="personalinfo" element={<PersonalInfo />} />
                <Route path="address" element={<Address/>} />
                <Route path="contact" element={<Contact/>} />
                <Route path="education" element={<Education/>} />
                <Route path="courses" element={<Courses/>} />
                <Route path="experience" element={<Experience/>} />
                <Route path="projects" element={<Projects/>} />
                <Route path="programing" element={<Programing/>} />
                <Route path="skills" element={<Skills/>} />
                <Route path="employment" element={<Employment/>} />
                {/*<Route path="/result" element={<Adress/>} />*/}
            </Routes>
        </StateMachineProvider>
    );
};

export default PostOffer;