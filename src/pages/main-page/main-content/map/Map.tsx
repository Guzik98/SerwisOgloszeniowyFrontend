import React, { useState } from 'react';
import { useSettings } from '../../../../Settings';
import { ScreenSize } from '../../../../types/ScreenSize';
import { useWindowSize } from '../../../../functions/handle-resize';
import { OfferType } from '../../../../types/offer';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import './map.sass';

export const Map = (): JSX.Element =>  {
    const size: ScreenSize = useWindowSize();
    const { offers, viewport, setViewport } = useSettings();
    const [ selectedOffer, setSelectedOffer ] = useState<OfferType | null>(null);

    const style = {
        maxHeight: size.height - 155,
        minHeight: size.height - 155,
        maxWidth: (size.width < 1500 ? size.width / 2.55 : size.width / 2 - 20),
        minWidth: (size.width < 1500 ? size.width / 2.55 : size.width / 2 - 20),
    };

    const navControlStyle = {
        className: 'map-btn',
        width: 30,
        height: 30,
        right: 10,
        top: 10,
        showCompass: false,
    };

    return (
        <div className='map' style={style}>
            <ReactMapGL
                {...viewport}
                style={style}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange = { (viewport: React.SetStateAction<{ latitude: number; longitude: number;
                    width: string; height: string; zoom: number; }>) => {
                    setViewport(viewport);
                }}
            >
                <NavigationControl style={navControlStyle} />
                { offers?.map((item) => {
                    return (
                        <Marker key={item._id} latitude={+item.latitude} longitude={+item.longitude}  >
                            <button className="market-btn"
                                    onMouseOver={ () =>setSelectedOffer(item) }
                                    onMouseLeave={ () =>setSelectedOffer(null) }
                                    onClick={  () => {
                                        // setUrlDetail(`https://justjoin.it/api/offers/${offer.id}`);
                                        setViewport({
                                            latitude: +item.latitude,
                                            longitude: +item.longitude,
                                            width: '100%',
                                            height: '98%',
                                            zoom: 16,
                                        });
                                        // setOpenDetailComponent(true);
                                    } }
                            >
                                <img className = 'pointer' style={{ maxWidth: '24px', maxHeight: '24px' }}
                                     src={`${item.photo_url}`}
                                />
                            </button>
                        </Marker>
                    );
                })}
                { selectedOffer && <Popup longitude={+selectedOffer.longitude} latitude={+selectedOffer.latitude}>
                    <div className="popup-marker">
                        <div className="popup-logo">
                            <img src={selectedOffer?.photo_url} alt='logo'/>
                        </div>
                        <div className="popup-content">
                            <span>{ selectedOffer.title }</span>
                            <span className="popup-salary">
                                {selectedOffer.employment_type.map((type) =>{
                                    return (
                                         type.salary !== null ? type.type + ' ' +
                                                type.salary?.from  + ' - '
                                                + type.salary?.to  + ' '
                                             // + type.salary?.currency.toUpperCase()
                                                :  'Undisclosed Salary'
                                    );
                                })
                                }
                            </span>
                            <span>{selectedOffer.title}</span>
                        </div>
                    </div>
                </Popup>}
            </ReactMapGL>
        </div>
    );
};


