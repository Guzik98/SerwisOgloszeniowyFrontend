import { Divider } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EducationType } from '../../../../../types/offer/education';

export const EducationSection = ( { edu }: { edu: EducationType[] } ): JSX.Element => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> EDUCATION </p>
                <Divider/>
                <div className='column'>
                    {edu.map((item) => {
                            const yearStart = item.start_date as unknown as string;
                            let yearEnd;
                            if ( item.end_date !== 'Till now' as unknown as string) {
                                if (typeof item.end_date === 'string') {
                                    yearEnd = item.end_date.slice(0, 4);
                                }
                            } else { yearEnd = item.end_date;  }
                            return (
                                <div key={uuidv4()} >
                                    <p>{ yearStart.slice(0, 4)} - { yearEnd }</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {edu.map((item) => {
                        return (
                            <div key={uuidv4()} >
                                <p className='row'> <span className='upper'>{item.area},</span>  &nbsp; <span className='upper'>{item.degree} </span>  &nbsp; { item.school_name }</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};