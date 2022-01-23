import { createContext, FC, useContext, useEffect, useState } from 'react';
import { OfferType } from './types/offer';
import { filtersType } from './types/filters';
import { ExperienceLevelEnum } from './enums/experience_level';
import { ContractTypeEnum } from './enums/contract-enum';
import { View } from './types/view';
import axios from 'axios';
import { SortByEnum } from './enums/sortby-enum';

export const SettingsContext = createContext<SettingsContextData | null>(null);

const useProviderSettings = () => {

    const [ offers, setOffers ] = useState<OfferType[]>();
    const [ filters, setFilters] = useState<filtersType>({
        city: 'All',
        mainTech: 'All',
        seniority: ExperienceLevelEnum.ALL,
        fromSalary: 0,
        toSalary: 100000,
        employmentType: ContractTypeEnum.ALL,
        sortBy: SortByEnum.LATEST,
        withSalary: false
    });
    const [ viewport, setViewport ] = useState<View>({
        latitude: 52.237049,
        longitude: 21.017532,
        width: '100%',
        height: '98%',
        zoom: 5,
    });

    useEffect(() => {
        axios.get('http://localhost:3000/offer')
            .then((response) => {
                return setOffers(response.data);
            });
    }, []);

    return {
        offers,
        setOffers,
        filters,
        setFilters,
        viewport,
        setViewport
    };
};

export const SettingsProvider: FC = ({ children }) => {
    const value = useProviderSettings();

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    );
};

type SettingsContextData = ReturnType<typeof useProviderSettings>;

export const useSettings = () : SettingsContextData  => {
    const settings = useContext(SettingsContext);

    if (!settings) {
        throw new Error('useSettings must by used inside SettingsProvider');
    }

    return settings;
};


