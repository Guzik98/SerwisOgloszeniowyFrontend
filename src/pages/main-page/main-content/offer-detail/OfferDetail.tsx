import React from 'react';
import './offer-detail.sass';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useWindowSize } from '../../../../functions/handle-resize';
import { OfferType } from '../../../../types/offer';
import { Divider } from '@mui/material';
import Tech from './components/Tech';
import Requirements from './components/Requirements';
import { ProjectSection } from './components/Project';
import { ExperienceSection } from './components/Expierience';
import { CertificateSection } from './components/Certificate';
import { EducationSection } from './components/Education';
import { v4 as uuidv4 } from 'uuid';

const OfferDetail = ( { offerDetailData }: { offerDetailData: OfferType }) => {
    const size: ScreenSize = useWindowSize();
    const style = {
        minHeight: size.height - 170,
        maxHeight: size.height - 170,
        maxWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
        minWidth: size.width < 1025 ? size.width - 20 : (size.width < 1500 ? size.width / 1.68 : size.width / 2),
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
            { offerDetailData.education &&
                <EducationSection edu={offerDetailData.education} />
            }
            { offerDetailData.certificate &&
                <CertificateSection certificate={offerDetailData.certificate}/>
            }
            { offerDetailData.experience &&
                <ExperienceSection experience={offerDetailData.experience}/>
            }
            { offerDetailData.project &&
                <ProjectSection project={offerDetailData.project}/>
            }

            <div className='blue-left-side' >
                <p className='row-name'> LANGUAGES </p>
                <Divider/>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className='contact-data'>
                    <div className='row' >
                        {offerDetailData.language.map((item) => {
                            return (
                                <div key={uuidv4()} >
                                    <p>
                                        <span className='upper'>{item.name} </span>
                                        &nbsp; {item.level}  &nbsp;
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Tech skill={offerDetailData.skills}/>
            <Requirements employment={offerDetailData.employment_type}  />
            <div className='margin'/>
        </div>
    );
};

export default OfferDetail;