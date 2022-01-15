import React from 'react';
import Header from './header/Header';
import FilterBar from './filter-bar/FilterBar';
import Content from './main-content/Content';

const MainPage = () => {
    return (
        <div className="main-page" style={{ width: '100vw', height: '100vh' }}>
            <Header/>
            <FilterBar/>
            <Content/>
        </div>
    );
};

export default MainPage;