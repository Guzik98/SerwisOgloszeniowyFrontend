import { ContractTypeEnum } from '../enums/contract-enum';
import { ExperienceLevelEnum } from '../enums/experience_level';
import { SortByEnum } from '../enums/sortby-enum';

export type filtersType = {
    city: string,
    mainTech: string,
    seniority: ExperienceLevelEnum,
    employmentType: ContractTypeEnum
    fromSalary: number,
    toSalary: number
    sortBy: SortByEnum,
    withSalary: boolean
}