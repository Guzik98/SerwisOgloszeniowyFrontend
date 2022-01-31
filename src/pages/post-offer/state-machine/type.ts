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
        _id: string | null,
        name: string,
        surname: string,
        short_personal_description: string,
        photo: FileList | undefined,
        photo_url: string | null
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
        project: ProjectType[] | null
        marker_icon: string;
        language: LanguageType[];
        experience_level: ExperienceLevelEnum
        skills: SkillsType[]
        employment_type: EmploymentType[]
    };
};
