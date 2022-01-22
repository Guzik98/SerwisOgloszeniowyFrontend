import React from 'react';
import './offer-detail.sass';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useWindowSize } from '../../../../functions/handle-resize';
import { OfferType } from '../../../../types/offer';
import { Divider } from '@mui/material';
import { EducationType } from '../../../../types/offer/education';
import { CertificateType } from '../../../../types/offer/certificateType';
import { ExperienceType } from '../../../../types/offer/experience';
import { ProjectType } from '../../../../types/offer/project';
import Tech from './components/Tech';
import Requirements from './components/Requirements';

type Ffsfs = {
    offerDetailData: OfferType
};

const OfferDetail = ( { offerDetailData }: Ffsfs ) => {
    const size: ScreenSize = useWindowSize();
    console.log( offerDetailData );

    const style = {
        minHeight: size.height - 170,
        maxHeight: size.height - 170,
        maxWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
        minWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
    };

    const ContactSection = (): JSX.Element => {
        return (
            <>
                <div className='blue-left-side'>
                    <p className='row-name'> CONTACT </p>
                    <Divider/>
                </div>
                <div className='white-right-side'>
                    <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                    <div className='contact-data'>
                        <p className='row'> <span className='upper'>E-MAIL:</span>  &nbsp; {offerDetailData.email}, &nbsp; <span className='upper'>MOBILE: </span>  &nbsp; {offerDetailData.phone_number}</p>
                        { (offerDetailData.github_url || offerDetailData.linkedin_url ) &&
                            <p  className='row'>
                                {offerDetailData.github_url &&
                                    <>
                                        <span className='upper'>GITHUB</span> &nbsp; {offerDetailData.github_url}
                                    </>
                                }
                                {offerDetailData.linkedin_url &&
                                <>
                                    <span className='upper'>LINKEDIN:</span> &nbsp; {offerDetailData.linkedin_url}
                                </>
                                }
                            </p>
                        }
                    </div>
                </div>
            </>
        );
    };

    type Ffsdfsd = {
        edu : EducationType[]
    };

    const EducationSection = ( { edu }: Ffsdfsd ): JSX.Element => {
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
                                return (<p key={item.degree}>{ yearStart.slice(0, 4)} - { yearEnd }</p>);
                            }
                        )}
                    </div>
                </div>
                <div className='white-right-side'>
                    <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                    <div className='contact-data'>
                        {edu.map((item) => {
                            return (
                                <p className='row' key={item.degree}> <span className='upper'>{item.area},</span>  &nbsp; <span className='upper'>{item.degree} </span>  &nbsp; { item.school_name }</p>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };

    type Ffsdfsdff = {
        certificate : CertificateType[]
    };
    const CertifateSection = ( { certificate }: Ffsdfsdff ): JSX.Element => {
        return (
            <>
                <div className='blue-left-side' >
                    <p className='row-name'> CERTIFICATE </p>
                    <Divider/>
                    <div className='column'>
                        {certificate.map((item) => {
                                const yearEnd = item.end_date as unknown as string;
                                return (<p key={item.name}>{ yearEnd.slice(0, 4) }</p>);
                            }
                        )}
                    </div>
                </div>
                <div className='white-right-side'>
                    <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                    <div className='contact-data'>
                        {certificate.map((item) => {
                            return (
                                <span className='row' key={item.name}> <p className='upper'>{item.name},</p>  &nbsp;  { item.institution }</span>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };

    type Ffsdfsdffss = {
        experience : ExperienceType[]
    };

    const ExperienceSection = ( { experience }: Ffsdfsdffss ): JSX.Element => {
        return (
            <>
                <div className='blue-left-side' >
                    <p className='row-name'> EXPERIENCE </p>
                    <Divider/>
                    {/*<div className='column'>*/}
                    {/*    {experience.map((item) => {*/}
                    {/*            const yearStart = item.start_date as unknown as string;*/}
                    {/*            const yearEnd = item.end_date as unknown as string;*/}
                    {/*            return (<p key={item.company_name}>{ yearStart.slice(0, 4)} - { yearEnd.slice(0, 4) }</p>);*/}
                    {/*        }*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>
                <div className='white-right-side'>
                    <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                    <div className='contact-data'>
                        {experience.map((item) => {
                            return (
                                <>
                                    <span className='row' key={item.company_name}> <p className='upper'>{item.company_name},</p>  &nbsp;  { item.job_title }</span>
                                    <span>
                                        {item.description }
                                    </span>
                                </>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };


    type ProjectSectionType = {
        project :  ProjectType[]
    };

    const ProjectSection = ( { project } : ProjectSectionType ): JSX.Element => {
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
                                <>
                                    <span className='row' key={item.project_name}>{item.project_name} </span>
                                    <span>
                                        {item.description }
                                    </span>
                                </>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    };


    return (
        <div className="offer-detail" style={style}>
                <div className='blue-left-side'>
                    <img className='photo' src={offerDetailData.photo_url} alt={'image'}/>
                </div>
                <div className='white-right-side'>
                    <div className='cv-head'>
                        {offerDetailData.name} {offerDetailData.surname}
                    </div>
                    <p className='description'>
                        {offerDetailData.short_personal_description}
                    </p>
                </div>
                <ContactSection/>
            { offerDetailData.education &&
                <EducationSection edu={offerDetailData.education} />
            }
            { offerDetailData.certificate &&
                <CertifateSection certificate={offerDetailData.certificate}/>
            }
            { offerDetailData.experience &&
                <ExperienceSection experience={offerDetailData.experience}/>
            }
            { offerDetailData.projects &&
                <ProjectSection project={offerDetailData.projects}/>
            }

            <div className='blue-left-side' >
                <p className='row-name'> LANGUAGES </p>
                <Divider/>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    <p className='row' >
                        {offerDetailData.language.map((item) => {
                            return (
                                <>
                                    <span className='upper' key={item.name}>{item.name} </span>
                                    &nbsp; {item.level}  &nbsp;
                                </>
                            );
                        })}
                    </p>
                </div>
            </div>
            <Tech skill={offerDetailData.skills}/>
            <Requirements employment={offerDetailData.employment_type}  />
            <div className='margin'>

            </div>
        </div>
    );
};

export default OfferDetail;