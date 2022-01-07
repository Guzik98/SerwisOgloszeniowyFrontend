import { useSettings } from '../../../../Settings';

export const checkParametersIncrement = ( filters: { city?: string; mainTech?: string; seniority: any; employmentType: any; fromSalary: any; toSalary: any; sortBy?: string; withSalary?: boolean; } ) : number => {
    let counter = 0;

    if ( filters.seniority != 'All' &&  filters.employmentType == 'All' &&  (filters.fromSalary == 0 || filters.toSalary == 100000) ) {
        counter = 1;
    }
    // if ( seniority == 'All' &&  employmentType != 'All' &&  (fromSalary == 0 || toSalary == 100000) ) {
    //     counter = 1;
    // }
    // if ( seniority == 'All' &&  employmentType == 'All' &&  (fromSalary != 0 || toSalary != 100000) ) {
    //     counter = 1;
    // }
    // if ( seniority != 'All' &&  employmentType != 'All' &&  (fromSalary == 0 || toSalary == 100000) ) {
    //     counter = 2;
    // }
    // if ( seniority == 'All' &&  employmentType != 'All' &&  (fromSalary != 0 || toSalary != 100000) ) {
    //     counter = 2;
    // }
    // if ( seniority != 'All' &&  employmentType == 'All' &&  (fromSalary != 0 || toSalary != 100000) ) {
    //     counter = 2;
    // }
    // if ( seniority != 'All' &&  employmentType != 'All' &&  (fromSalary != 0 || toSalary != 100000) ) {
    //     counter = 3;
    // }
    // if ( seniority == 'All' &&  employmentType == 'All' &&  (fromSalary == 0 && toSalary == 100000) ) {
    //     counter = 0;
    // }
    return counter;
};
