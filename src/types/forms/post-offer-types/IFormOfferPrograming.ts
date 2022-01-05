import { ExperienceLevelEnum } from '../../../enums/experience_level';
import { LanguageType } from '../../offer/languague';

export type IFormOfferPrograming = {
    marker_icon: string,
    experience_level: ExperienceLevelEnum
    language: LanguageType[]
}