import React from 'react';
import './loading.sass';
import ReactLoading from 'react-loading';

const Loading = () : JSX.Element => {
    return (
        <div className='loading'>
            <ReactLoading
                type={'spin'}
                color={'black'}
                height={667}
                width={375}
            />
        </div>

    );
};

export  default  Loading;