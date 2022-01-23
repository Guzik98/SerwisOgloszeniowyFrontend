import React from 'react';
import { EmploymentType } from '../../../../../types/offer/employment';
import { Divider } from '@mui/material';
import { UpperCase } from '../../../../../functions/upperCase';
import { v4 as uuidv4 } from 'uuid';
import { contractReturn } from '../../../../../functions/contract-return';

const Requirements = ({ employment }: { employment: EmploymentType[] }) => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> REQUIREMENTS </p>
                <Divider/>
                <div className='column'>
                    {employment.map((item) => {
                            return (
                                <div key={uuidv4()} >
                                    <p>{ UpperCase(contractReturn(item.type)) }</p>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {employment.map((item) => {
                        return (
                            <div key={uuidv4()} >
                                <p className='row' > { item.salary !== null ? item.salary?.from.toString().slice(0, -3) + ' ' + item.salary?.from.toString().slice(-3)  + ' - '
                                    + item.salary?.to.toString().slice(0, -3) + ' ' + item.salary?.to.toString().slice(-3)  + ' ' + 'PLN'
                                    : 'Undisclosed Salary' }</p>

                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Requirements;