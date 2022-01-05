import { SalaryType } from './salary';
import { ContractTypeEnum } from '../../enums/contract-enum';

export type EmploymentType = {
    type: ContractTypeEnum
    salary: SalaryType | null
}
