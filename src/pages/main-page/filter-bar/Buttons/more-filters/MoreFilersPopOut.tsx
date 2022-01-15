import React from 'react';
import { useSettings } from '../../../../../Settings';
import { makeStyles } from '@mui/styles';
import { HandlePopOut } from '../../../../../types/pop0ut';
import { ContractTypeEnum } from '../../../../../enums/contract-enum';
import { ExperienceLevelEnum } from '../../../../../enums/experience_level';
import { Button, DialogActions, DialogContent, Divider, IconButton, Slider } from '@mui/material';
import { employmentBtn, seniorityBtn } from './inputs';
import ButtonComponent from '../../../../../common/components/ButtonComponent';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './moreFilters.sass';

const useStylesBtn = makeStyles({
    label: {
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 600,
        color: 'rgb(119, 119, 119)',
    },
    clearFilter: {
        borderRadius: '32px',
        borderColor: 'rgb(228, 232, 240)',
        margin: '6px',
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 600,
        height: 46
    },
    showOffers: {
        borderRadius: '32px',
        borderColor: 'rgb(255, 64, 129)',
        background: 'rgb(255, 64, 129)',
        margin: '6px',
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 600,
        height: 46,
        color: 'rgb(255, 255, 255)',
        '&:hover': {
            background: 'rgb(178, 44, 90)',
            borderColor: 'rgb(178, 44, 90)',
        },
    },
    divider: {
        margin: '24px 0px 16px'
    },
    headerFooter: {
        padding: '16px 24px 16px 24px',
        justifyContent: 'space-between',
    },
});

const MoreFilersPopOut = ({ handleClose }: HandlePopOut): JSX.Element => {
    const classesBtn = useStylesBtn();
    const { filters, setFilters } = useSettings();
    const [value, setValue] = React.useState<number[]>([filters.fromSalary, filters.toSalary]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function numberWithSpaces(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const submit = () => {
        setFilters({ ...filters, fromSalary: value[0], toSalary: value[1] });
        if (handleClose){
            handleClose();
        }
    };

    const clear = () => {
        setFilters({ ...filters,
            fromSalary: value[0],
            toSalary: value[1],
            employmentType: ContractTypeEnum.ALL,
            seniority: ExperienceLevelEnum.ALL
        });
        if (handleClose){
            handleClose();
        }
    };

    return (
        <>
            <div className="dialog-title">
                More filters
                <IconButton aria-label="close" onClick={handleClose}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            <DialogContent dividers>
                <div className = "label-title">
                    Salary expectations?
                </div>
                <Slider
                    value={value}
                    step={1000}
                    onChange={handleChange}
                    aria-labelledby="range-slider"
                    max = { 100000 }
                    color="secondary"
                />
                <div className="slider-output">
                    <div className="slider-output">
                        <div className="slider-text">Min. amount</div>
                        <div className="output">
                            { value[0] + ' PLN'}
                        </div>
                    </div>
                    <div className="slider-output-between"/>
                    <div className="slider-output">
                        <div className="slider-text">Max. amount</div>
                        <div className="output">
                            { value[1] === 100000 ?
                                numberWithSpaces(value[1]) + '+' + ' PLN'
                                : numberWithSpaces(value[1]) + ' PLN'}
                        </div>
                    </div>
                </div>
                <Divider classes={{ root: classesBtn.divider }} />
                <div className="label-title">
                    Employment Type
                </div>

                {employmentBtn.map((item) =>{
                    return (
                            <ButtonComponent
                                key={item.value}
                                width={'78px'}
                                justifyContent={'center'}
                                onClick={() => setFilters({ ...filters, employmentType: item.value })}
                                filter={filters.employmentType !== item.value}
                                childrens={item.name}
                            />
                    );
                })}
                <Divider classes={{ root: classesBtn.divider }}/>
                <div className="label-title">
                    Seniority
                </div>
                {seniorityBtn.map((item) =>{
                    return (
                        <ButtonComponent
                            key={item.value}
                            width={'78px'}
                            justifyContent={'center'}
                            onClick={() => setFilters({ ...filters, seniority: item.value })}
                            filter={filters.seniority !== item.value}
                            childrens={item.name}
                        />
                    );
                })}
            </DialogContent>
            <DialogActions classes={{ root: classesBtn.headerFooter }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={clear}
                    classes={{
                        root: classesBtn.clearFilter,
                    }}>
                    Clear filters
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    role = 'show-offers'
                    onClick={submit}
                    classes={{
                        root: classesBtn.showOffers,
                    }}>
                    Show offers
                </Button>
            </DialogActions>
        </>
    );
};

export default MoreFilersPopOut;