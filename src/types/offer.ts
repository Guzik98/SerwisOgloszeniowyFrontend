import { EducationType } from './offer/education';
import { CertificateType } from './offer/certificateType';
import { ExperienceType } from './offer/experience';
import { ProjectType } from './offer/project';
import { LanguageType } from './offer/languague';
import { ExperienceLevelEnum } from '../enums/experience_level';
import { SkillsType } from './offer/skill';
import { EmploymentType } from './offer/employment';

export type OfferType = {
    _id: string,
    title: string;
    name: string,
    surname: string,
    shortDescription: string,
    published_at: string
    photo_url: string,
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
    owner: string
}