import { useSettings } from '../Settings';
import { OfferType } from '../types/offer';
import { ExperienceLevelEnum } from '../enums/experience_level';
import { ContractTypeEnum } from '../enums/contract-enum';
import { SortByEnum } from '../enums/sortby-enum';

export const  filterFunction = (): OfferType[] | undefined => {
    const { filters, offers } = useSettings();
    let filtered = offers;

    console.log(filters.sortBy);

    if ( filters.mainTech !== 'All'){
        filtered = filtered?.filter((item) => {
            return item.marker_icon === filters.mainTech;
        });
    }

    if ( filters.city !== 'All'){
        filtered = filtered?.filter((item) => {
            if (filters.city === 'Trójmiasto'){
                return item.city.toLowerCase() === 'sopot' ||  item.city.toLowerCase() === 'gdańsk' || item.city.toLowerCase() === 'gdynia';
            }
            return item.city.toLowerCase() === filters.city.toLowerCase();
        });
    }

    if ( filters.employmentType !== ContractTypeEnum.ALL){
        filtered = filtered?.map((element) => {
            return { ...element, employment_type: element.employment_type.filter((subElement) => subElement.type === filters.employmentType ) };
        });
    }

    if ( filters.seniority !== ExperienceLevelEnum.ALL ){
        filtered = filtered?.filter((item) => {
            return item.experience_level === filters.seniority;
        });
    }

    if ( filters.fromSalary !== 0 || filters.toSalary !== 100000 ){
        filtered = filtered?.filter((element) => {
            const item =  { ...element,
                employment_type: element.employment_type.filter((subElement) => {
                    if (subElement.salary  !== null){
                        return subElement.salary.from >= filters.fromSalary &&  subElement.salary.to <= filters.toSalary;
                    }
                })
            };
            return item.employment_type.length > 0;
        });
    }

    if ( filters.withSalary || filters.sortBy !== SortByEnum.LATEST ){
        console.log('here');
        filtered = filtered?.filter((item) => {
            const item2 =  {
                ...item,
                employment_type: item.employment_type.filter((emp) => {
                    return emp.salary !== null;
                })
            };
            return item2.employment_type.length > 0;
        });
    }

    if ( filters.sortBy !== SortByEnum.LATEST ) {

        filtered = filtered?.sort((a, b): number => {
            const aHelpTo = a.employment_type[0].salary?.to;
            const aHelpFrom = a.employment_type[0].salary?.from;
            const bHelpTo = b.employment_type[0].salary?.to;
            const bHelpFrom = b.employment_type[0].salary?.from;
            if ( aHelpTo && aHelpFrom && bHelpFrom && bHelpTo){
                if (filters.sortBy === SortByEnum.HIGHEST) {
                    if (aHelpTo === bHelpTo){
                        return (bHelpFrom - aHelpFrom);
                    } else {
                        return (bHelpTo - aHelpTo);
                    }
                }
                if (filters.sortBy === SortByEnum.LOWEST) {
                    if (bHelpTo === aHelpTo){
                        return (aHelpFrom - bHelpFrom);
                    } else {
                        return (aHelpTo - bHelpTo);
                    }
                }
            }
            return  0;
        });
    }

    if ( filters.sortBy == SortByEnum.LATEST) {
        filtered = filtered?.sort(function (a, b) {
            return ( a.published_at > b.published_at) ? -1 : ((a.published_at < b.published_at ) ? 1 : 0);
        });
    }

    return filtered;
};