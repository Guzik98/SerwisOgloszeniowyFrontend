import React from 'react';
import './LocationPopOver.sass';
import MediaQuery from 'react-responsive';
import { useSettings } from '../../../../../Settings';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import { Collapse, Divider } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from '@mui/styles';
import { cityPoland, cityWorld, OtherPolandCities } from './cityArrays';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { HandlePopOut } from '../../../../../types/pop0ut';

const useStyles = makeStyles({
    divider: {
        margin: '24px 0px 16px'
    },
});


export const PopOverLocation = ( { handleClose } : HandlePopOut) :JSX.Element => {
    const classes = useStyles();
    const { setFilters, filters, setViewport, viewport } = useSettings();
    const [open, setOpen] = React.useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const clear = () => {
        setViewport({
            latitude: 52.237049,
            longitude: 21.017532,
            width: '100%',
            height: '98%',
            zoom: 5,
        });
        setFilters({ ...filters, city: 'All' });

        if (handleClose){
            handleClose();
        }
    };

    return (
        <div
            className="typography"
            role='pop-out'
        >
            <div className="typography-border">
                <div className="typography-container">
                    <MediaQuery maxWidth={1024}>
                        <div className="title">
                            <span>Location</span>
                            <div
                                role = 'close-location-pop-out-small'
                                className="exit-icon-border"
                                onClick={handleClose}>
                                <div className="exit-icon">
                                    <HighlightOffIcon/>
                                </div>
                            </div>
                        </div>
                        <Divider classes={{ root: classes.divider }}/>
                    </MediaQuery>
                    <div className="type-work">
                        <div className="type-work-level2">
                            <div onClick={() => setFilters({ ...filters, city: 'Remote Poland' }) }>
                                <ButtonComponent
                                    filter= {filters.city !== 'Remote Poland'}
                                    onClick={() => handleClose}
                                    childrens={'Remote Poland'}
                                 />
                            </div>
                            <div onClick={() => setFilters({ ...filters, city: 'Remote Global' }) }>
                                <ButtonComponent
                                    onClick={() => handleClose}
                                    filter= {filters.city !== 'Remote Global'}
                                    childrens={'Remote Global'}
                                />
                            </div>
                        </div>
                        <MediaQuery minWidth={1025}>
                            <div className="exit-icon-border"
                                 role = 'close-location-pop-out-big'
                                 onClick={handleClose}
                            >
                                <div className="exit-icon"
                                >
                                    <HighlightOffIcon/>
                                </div>
                            </div>
                        </MediaQuery>
                    </div>
                    <div className="city-container">
                        <a className="city-range-text">
                            Top Poland
                        </a>
                        <div className="city-buttons">
                            {cityPoland.map((item) =>
                                <div onClick={handleClose} key={item.city}>
                                    <ButtonComponent onClick={() => {
                                        setFilters({ ...filters, city: item.city });
                                        setViewport({ ...viewport, zoom: 11, latitude: item.latitude, longitude: item.longitude });
                                        }}
                                        filter={filters.city !== item.city}
                                        childrens={item.city}
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="city-container">
                        <a role="button" className="city-range-text">
                            Top World
                        </a>
                        <div className="city-buttons">
                            {cityWorld.map((item) =>
                                <div onClick={handleClose} key={item.city}>
                                    <ButtonComponent onClick={() => {
                                        setFilters({ ...filters, city: item.city });
                                        setViewport({ ...viewport, zoom: 11, latitude: item.latitude, longitude: item.longitude });
                                    }}
                                                     filter={filters.city !== item.city}
                                                     childrens={item.city}
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="city-container">
                        <a role="button" className="city-range-text" onClick={ toggle }>
                            Other locations Poland
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </a>
                        <Collapse in={open}>
                            <div className="city-buttons"  >
                                {OtherPolandCities.map((item) =>
                                    <div onClick={handleClose} key={item.city}>
                                        <ButtonComponent onClick={() => {
                                            setFilters({ ...filters, city: item.city });
                                            setViewport({ ...viewport, zoom: 11, latitude: item.latitude, longitude: item.longitude });
                                        }}
                                                         filter={filters.city !== item.city}
                                                         childrens={item.city}
                                        />
                                    </div>)
                                }
                            </div>
                        </Collapse>
                    </div>
                    <Divider className="divider-pop" variant="fullWidth"/>
                    <ButtonComponent
                        onClick={clear}
                        childrens={'Clear Filter'}
                        filter={true}
                    />

                </div>
            </div>
        </div>
    );
};
