import { EducationType } from '../../../types/offer/education';
import { CertificateType } from '../../../types/offer/certificateType';
import { ExperienceType } from '../../../types/offer/experience';
import { ProjectType } from '../../../types/offer/project';
import { ExperienceLevelEnum } from '../../../enums/experience_level';
import { SkillsType } from '../../../types/offer/skill';
import { EmploymentType } from '../../../types/offer/employment';
import { LanguageType } from '../../../types/offer/languague';

export type GlobalState = {
    yourDetails: {
        name: string,
        surname: string,
        shortDescription: string,
        photo: File | undefined,
        photoUrl: string | null
        street: string,
        city: string,
        country_code: string,
        email: string
        phone_number: number
        longitude: string,
        latitude: string,
        github_url: string | null
        linkedin_url: string | null
        education: EducationType[] | null
        certificate: CertificateType[] | null
        experience: ExperienceType[] | null
        projects: ProjectType[] | null
        marker_icon: string;
        language: LanguageType[];
        experience_level: ExperienceLevelEnum
        skills: SkillsType[]
        employment_type: EmploymentType[]
    };
};
