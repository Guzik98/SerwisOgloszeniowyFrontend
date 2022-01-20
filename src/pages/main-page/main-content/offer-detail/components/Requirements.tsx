import React from 'react';
import { EmploymentType } from '../../../../../types/offer/employment';
import { Divider } from '@mui/material';
import { UpperCase } from '../../../../../functions/upperCase';

type RequirementsType = {
    employment: EmploymentType[]
};



const Requirements = ({ employment }: RequirementsType) => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> Requirement </p>
                <Divider/>
                <div className='column'>
                    {employment.map((item) => {
                            return (<p key={item.type}>{ UpperCase(item.type) }</p>);
                        }
                    )}
                </div>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {employment.map((item) => {
                        return (
                            <>
                                <p className='row' key={item.type}> { item.salary !== null ? item.salary?.from.toString().slice(0, -3) + ' ' + item.salary?.from.toString().slice(-3)  + ' - '
                                    + item.salary?.to.toString().slice(0, -3) + ' ' + item.salary?.to.toString().slice(-3)  + ' ' + 'PLN'
                                    : 'Undisclosed Salary' }</p>

                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Requirements;