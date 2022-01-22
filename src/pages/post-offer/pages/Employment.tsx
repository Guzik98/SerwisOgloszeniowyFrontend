import React, { useEffect, useState } from 'react';
import { array, number, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IFormOfferEmployment } from '../../../types/forms/post-offer-types/IFormOfferEmployment';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import ReactHookFormTextField3 from '../../../common/components/RHookFormTextField3';
import { Button, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { ContractTypeEnum } from '../../../enums/contract-enum';
import { ContractInput } from './select-inputs/contract-input';
import Template from '../../Template';
import getLocation from '../../../services/get-location';
import { GeocodeType } from '../../../types/geocode';
import { sendOffer } from '../../../services/send-offer';
import { sendProfilePhoto } from '../../../services/send-photo';
import { EmploymentType } from '../../../types/offer/employment';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';
import { sendEditedOffer } from '../../../services/send-edited-offer';

const employmentSchema = object({
    type: string().required('this is required'),
    salary: object({
        from: number().min(1000).max(100000).required('this is required'),
        to: number().min(1000).max(100000).required('this is required'),
        currency: string()
    }).optional().nullable()
});

const formSchema = object({
    employment_type: array().of(employmentSchema)
});

const Employment = ({ type }: TemplateTypeChild) => {
    console.log(type);
    const navigate = useNavigate();

    const { actions, state  } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferEmployment>({
        defaultValues: {
            employment_type: state.yourDetails.employment_type,
        },
        resolver: yupResolver(formSchema)
    });

    const { control, setValue, getValues } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'employment_type'
    });

    const [geocode, setGeocode] = useState<GeocodeType>(undefined);
    const [empType, setEmpType ] = useState<EmploymentType[]>();
    const [url, setUrl] = useState<string>();
    const [checkFlow, setCheckFlow] = useState<boolean>(false);
    const [check, setCheck ] = useState<boolean[]>([false, false, false]);

    const submit: SubmitHandler<IFormOfferEmployment> = (data: IFormOfferEmployment) => {
        setEmpType(data.employment_type);
        getLocation(state.yourDetails.street + ', ' + state.yourDetails.city + ', ' + state.yourDetails.country_code, setGeocode);
        if (state.yourDetails.photo !== undefined) {
            sendProfilePhoto(state.yourDetails.photo)
                .then(response => { setUrl(response); } );
        } else {
            setUrl('http://localhost:3000/profile/logo/default-avatar.jpg');
        }
    };

    useEffect(() => {
        if ( geocode && url && empType && !checkFlow) {
            actions.updateOffer({
                ...state.yourDetails,
                photo_url: url,
                latitude: geocode?.latitude,
                longitude: geocode?.longitude,
                employment_type: empType,
            });
            setCheckFlow(true);
        }
    }, [url, geocode, empType]);

    useEffect(() => {
            if (checkFlow && state.yourDetails.photo_url === url && state.yourDetails.latitude === geocode?.latitude && state.yourDetails.longitude == geocode?.longitude ){
                if (type === 'postoffer') {
                    sendOffer(state);
                } else {
                    sendEditedOffer(state);
                }
                navigate('/mainpage');
            }
    },  [checkFlow, actions.updateOffer]);

    useEffect(() => {
        if (type === 'postoffer'){
            append({ type: ContractTypeEnum.PERMANENT, salary: null });
            setCheck( [true, true, true]);
        }
    }, []);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.checked){
            setValue(`employment_type.${index}.salary`, null );
            check[index] = true;
            setCheck({ ...check });
        } else {
            check[index] = false;
            setCheck({ ...check });
            setValue(`employment_type.${index}.salary.from`, 10000 );
            setValue(`employment_type.${index}.salary.to`, 100000 );
        }
        console.log(getValues(`employment_type.${index}.salary`));
    };

    return (
        <Template header={'Employment'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(( field,  index ) =>
                        <div key={field.id} className = 'arrays'>
                            <h4>
                                Employment {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Contract type" name={`employment_type.${index}.type`} index={index} select={true} defaultValue={getValues(`employment_type.${index}.type`)}>
                                {ContractInput.map((item)=>
                                    <MenuItem disabled={item.value === getValues(`employment_type.${index - 1 }.type`) || item.value === getValues(`employment_type.${index - 2 }.type`)  } key={item.label} value={item.value}>{item.label}</MenuItem>
                                )}
                            </ReactHookFormTextField2>
                            { !check[index] &&
                            <>
                                <ReactHookFormTextField3 label="Salary from" name={`employment_type.${index}.salary.from`} type="number"  index={index} />
                                <ReactHookFormTextField3 label="Salary to" name={`employment_type.${index}.salary.to`}  type="number" index={index}  />
                            </>
                            }
                            <FormControlLabel
                                label="Undisclosed salary"
                                control={<Checkbox
                                    onChange={ (e) => onChange(e, index)}
                                />}
                            />
                            { fields.length > 1 && <Button onClick={() => remove(index)} > remove </Button> }
                        </div>
                    )}
                    { fields.length < 3 &&
                    <Button  type="button" onClick={() => append({}) }> Add one contract type</Button>
                    }
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/skills`)}>
                            Previous
                        </SubmitButtonStyled>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
                            Send
                        </SubmitButtonStyled>
                    </div>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Employment;