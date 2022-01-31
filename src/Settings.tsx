import { createContext, FC, useContext, useEffect, useState } from 'react';
import { OfferType } from './types/offer';
import { filtersType } from './types/filters';
import { View } from './types/view';
import { getOffers } from './services/get-offers';
import { filtersDefault } from './deflautValues/filters-default';
import { viewPortDefault } from './deflautValues/view-port-default';

export const SettingsContext = createContext<SettingsContextData | null>(null);

const useProviderSettings = () => {

    const [ offers, setOffers ] = useState<OfferType[]>();
    const [ filters, setFilters] = useState<filtersType>(filtersDefault);
    const [ viewport, setViewport ] = useState<View>(viewPortDefault);

    useEffect(() => {
        getOffers(setOffers);
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


