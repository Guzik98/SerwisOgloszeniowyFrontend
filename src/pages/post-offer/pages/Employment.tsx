import React, { useEffect, useState } from 'react';
import { array, number, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm, Controller } from 'react-hook-form';
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
import { EducationType } from '../../../types/offer/education';
import { EmploymentType } from '../../../types/offer/employment';
import { sleep } from '../../../functions/sleep';

const employmentSchema = object({
    type: string().required(),
    salary: object({
        from: number().min(1000).max(100000).required('this is required'),
        to: number().min(1000).max(100000).required('this is required'),
        currency: string()
    }).optional().nullable()
})

const formSchema = object({
    employment_type: array().of(employmentSchema)
})

const Employment = () => {
    const navigate = useNavigate();

    const { actions, state  } = useStateMachine({ updateOffer });


    const methods = useForm<IFormOfferEmployment>({
        resolver: yupResolver(formSchema)
    });

    const { control , setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'employment_type'
    });

    const [check, setCheck ] = useState<boolean[]>([true, true, true]);

    const [geocode, setGeocode] = useState<GeocodeType>(undefined);
    const [employment_type, setEmployeeType] = useState<EmploymentType[]>();
    const [url, setUrl] = useState<string>()
    const [checkFlow, setCheckFlow] = useState<boolean>(false);

    const submit: SubmitHandler<IFormOfferEmployment> = (data: IFormOfferEmployment) => {
        setEmployeeType(data.employment_type);
        getLocation(state.yourDetails.street + ', ' + state.yourDetails.city + ', ' + state.yourDetails.country_code, setGeocode);
        if (state.yourDetails.photo !== undefined) {
            sendProfilePhoto(state.yourDetails.photo)
                .then(response => { setUrl(response) } );
        } else {
            setUrl('http://localhost:3000/profile/logo/default-avatar.jpg')
        }
    }

    useEffect(() => {
        console.log('geocode', geocode);
        console.log('url', url);
        console.log('emplotment', employment_type);
        console.log('check', checkFlow);
        if ( geocode && url && employment_type && !checkFlow) {
            console.log('here')
            actions.updateOffer({
                ...state.yourDetails,
                photoUrl: url,
                latitude: geocode?.latitude,
                longitude: geocode?.longitude,
                employment_type: employment_type,
            })
            setCheckFlow(true);
        }
    },[url, geocode, employment_type])

    useEffect(() => {
            if (checkFlow){
                sendOffer(state);
                navigate('/mainpage');
            }
    },[checkFlow])



    useEffect(() => {
        append({ type: ContractTypeEnum.PERMANENT, salary: null })
    },[])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>,index: number) => {
        if(e.target.checked){
            let newCheck = [...check];
            newCheck[index] = true;
            setCheck(newCheck);
            setValue(`employment_type.${index}.salary`, null );
        } else {
            let newCheck = [...check];
            newCheck[index] = false;
            setCheck(newCheck);
            setValue(`employment_type.${index}.salary.from`, 10000 );
            setValue(`employment_type.${index}.salary.to`, 100000 );
        }
    };

    return (
        <Template header={'Employment'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(( field,  index ) =>
                        <div key={field.id} className = 'Experience'>
                            <h4>
                                Employment {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Contract type" name={`employment_type.${index}.type`} index={index} select={true} defaultValue={ContractTypeEnum.PERMANENT}>
                                {ContractInput.map((item)=>
                                    <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                                )}
                            </ReactHookFormTextField2>
                            { !check[index] &&
                            <>
                                <ReactHookFormTextField3 label="Salary from" name={`employment_type.${index}.salary.from`} type="number" index={index}/>
                                <ReactHookFormTextField3 label="Salary to" name={`employment_type.${index}.salary.to`}  type="number" index={index}/>
                            </>
                            }
                            <FormControlLabel
                                label="Undisclosed salary"
                                control={<Checkbox
                                    checked={ check[index] }
                                    onChange={ (e) => onChange(e,index)}
                                />}
                            />
                            { fields.length > 1 && <Button onClick={() => remove(index)} > remove </Button> }
                        </div>
                    )}
                    { fields.length < 3 &&
                    <Button  type="button" onClick={() => append({ type: ContractTypeEnum.PERMANENT, salary: null }) }> Add one contract type</Button>
                    }
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Send
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Employment;