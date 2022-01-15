import { GlobalState } from 'little-state-machine';
import { EducationType } from '../../../types/offer/education';
import { CertificateType } from '../../../types/offer/certificateType';
import { ExperienceType } from '../../../types/offer/experience';
import { ProjectType } from '../../../types/offer/project';
import { ExperienceLevelEnum } from '../../../enums/experience_level';
import { SkillsType } from '../../../types/offer/skill';
import { EmploymentType } from '../../../types/offer/employment';
import { LanguageType } from '../../../types/offer/languague';

export function updateOffer(
    state: GlobalState,
    payload: {
        name: string,
        surname: string,
        shortDescription: string,
        photo: File | undefined
        photoUrl: string | null
        street: string,
        city: string,
        country_code: string,
        longitude: string,
        latitude: string,
        email: string
        phone_number: number
        github_url: string | null
        linkedin_url: string | null
        education: EducationType[] | null
        certificate: CertificateType[] | null
        experience: ExperienceType[] | null
        projects: ProjectType[] | null
        marker_icon: string;
        language: LanguageType[]
        experience_level: ExperienceLevelEnum
        skills: SkillsType[]
        employment_type: EmploymentType[]
    }
) {
    return {
        ...state,
        yourDetails: {
            ...state.yourDetails,
            ...payload
        }
    };
}