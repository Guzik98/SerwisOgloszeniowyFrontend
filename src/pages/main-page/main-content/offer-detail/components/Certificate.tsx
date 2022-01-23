import { Divider } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CertificateType } from '../../../../../types/offer/certificateType';
export const CertificateSection = ( { certificate }: { certificate: CertificateType[] } ): JSX.Element => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> CERTIFICATE </p>
                <Divider/>
                <div className='column'>
                    {certificate.map((item) => {
                            const yearEnd = item.end_date as unknown as string;
                            return (
                                <div key={uuidv4()}>
                                    <p>{ yearEnd.slice(0, 4) }</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {certificate.map((item) => {
                        return (
                            <div key={uuidv4()}>
                                    <span className='row'> <p className='upper'>{item.name},</p>  &nbsp;  { item.institution }</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};