import { ExperienceLevelEnum } from '../enums/experience_level';
import { ContractTypeEnum } from '../enums/contract-enum';
import { SortByEnum } from '../enums/sortby-enum';

export const  filtersDefault = {
    city: 'All',
    mainTech: 'All',
    seniority: ExperienceLevelEnum.ALL,
    fromSalary: 0,
    toSalary: 100000,
    employmentType: ContractTypeEnum.ALL,
    sortBy: SortByEnum.LATEST,
    withSalary: false
};