import { createContext, FC, useContext, useState } from 'react';
import { OfferType } from './types/offer';
import { filtersType } from './types/filters';
import { ExperienceLevelEnum } from './enums/experience_level';
import { ContractTypeEnum } from './enums/contract-enum';
import { View } from './types/view';

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
        sortBy: 'Latest',
        withSalary: false
    });
    const [ viewport, setViewport ] = useState<View>({
        latitude: 52.237049,
        longitude: 21.017532,
        width: '100%',
        height: '98%',
        zoom: 5,
    });

    return {
        offers,
        setOffers,
        filters,
        setFilters,
        viewport,
        setViewport
    }
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


