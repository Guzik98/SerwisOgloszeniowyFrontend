import { Divider } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProjectType } from '../../../../../types/offer/project';

export const ProjectSection = ( { project }: { project: ProjectType[] } ): JSX.Element => {
    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> PROJECTS </p>
                <Divider/>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    {project.map((item) => {
                        return (
                            <div key={uuidv4()} >
                                <p className='row upper'>{item.project_name} </p>
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