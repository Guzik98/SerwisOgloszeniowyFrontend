import { ContractTypeEnum } from '../../../../../enums/contract-enum';
import { ExperienceLevelEnum } from '../../../../../enums/experience_level';

export const checkParametersIncrement = (filters: { city: string; mainTech: string; seniority: ExperienceLevelEnum; employmentType: ContractTypeEnum; fromSalary: number; toSalary: number; sortBy?: string; withSalary?: boolean; }): number => {
    let counter = 0;

    if ( filters.seniority !== ExperienceLevelEnum.ALL && filters.employmentType === ContractTypeEnum.ALL && (filters.fromSalary === 0 || filters.toSalary === 100000) ) {
        counter = 1;
    }
    if ( filters.seniority === ExperienceLevelEnum.ALL && filters.employmentType !== ContractTypeEnum.ALL && (filters.fromSalary === 0 || filters.toSalary === 100000) ) {
        counter = 1;
    }
    if ( filters.seniority === ExperienceLevelEnum.ALL && filters.employmentType === ContractTypeEnum.ALL && (filters.fromSalary !== 0 || filters.toSalary !== 100000) ) {
        counter = 1;
    }
    if ( filters.seniority !== ExperienceLevelEnum.ALL && filters.employmentType !== ContractTypeEnum.ALL && (filters.fromSalary === 0 || filters.toSalary === 100000) ) {
        counter = 2;
    }
    if ( filters.seniority === ExperienceLevelEnum.ALL && filters.employmentType !== ContractTypeEnum.ALL && (filters.fromSalary !== 0 || filters.toSalary !== 100000) ) {
        counter = 2;
    }
    if ( filters.seniority !== ExperienceLevelEnum.ALL && filters.employmentType === ContractTypeEnum.ALL && (filters.fromSalary !== 0 || filters.toSalary !== 100000) ) {
        counter = 2;
    }
    if ( filters.seniority !== ExperienceLevelEnum.ALL && filters.employmentType !== ContractTypeEnum.ALL && (filters.fromSalary !== 0 || filters.toSalary !== 100000) ) {
        counter = 3;
    }
    if ( filters.seniority === ExperienceLevelEnum.ALL && filters.employmentType === ContractTypeEnum.ALL && (filters.fromSalary === 0 && filters.toSalary === 100000) ) {
        counter = 0;
    }
    return counter;
};
