import { ContractTypeEnum } from '../../../../../enums/contract-enum';
import { ExperienceLevelEnum } from '../../../../../enums/experience_level';

export const employmentBtn  = [
    { name: 'All', value: ContractTypeEnum.ALL },
    { name: 'B2B', value: ContractTypeEnum.B2B  },
    { name: 'Permanent', value: ContractTypeEnum.PERMANENT  },
    { name: 'Mandate Contract', value: ContractTypeEnum.MANDATE_CONTRACT  }
];

export const seniorityBtn = [
    { name: 'All', value: ExperienceLevelEnum.ALL },
    { name: 'Junior', value: ExperienceLevelEnum.JUNIOR },
    { name: 'Mid', value: ExperienceLevelEnum.MID },
    { name: 'Senior', value: ExperienceLevelEnum.SENIOR }
];