import { ContractTypeEnum } from '../enums/contract-enum';

export const contractReturn = ( employment: ContractTypeEnum ): string => {
    let value = '';
    switch (employment) {
        case ContractTypeEnum.MANDATE_CONTRACT:
            value = 'Mandate contract';
            break;
        case ContractTypeEnum.B2B:
            value = 'B2B';
            break;
        case ContractTypeEnum.PERMANENT:
            value = 'Permanent';
            break;
    }
    return value;
};