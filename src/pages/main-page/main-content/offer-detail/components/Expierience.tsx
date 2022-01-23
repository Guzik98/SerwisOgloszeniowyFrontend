import { Divider } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ExperienceType } from '../../../../../types/offer/experience';

export const ExperienceSection = ( { experience }: { experience: ExperienceType[] }): JSX.Element => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> EXPERIENCE </p>
                <Divider/>
                {/*<div className='column'>*/}
                {/*    {experience.map((item) => {*/}
                {/*            const yearStart = item.start_date as unknown as string;*/}
                {/*            const yearEnd = item.end_date as unknown as string;*/}
                {/*            return (<p key={item.company_name + uuid()}>{ yearStart.slice(0, 4)} - { yearEnd.slice(0, 4) }</p>);*/}
                {/*        }*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {experience.map((item) => {
                        return (
                            <div key={uuidv4()} >
                                <span className='row' key={uuidv4()}> <p className='upper'>{item.company_name},</p>  &nbsp;  { item.job_title }</span>
                                <span>
                                        {item.description }
                                    </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};