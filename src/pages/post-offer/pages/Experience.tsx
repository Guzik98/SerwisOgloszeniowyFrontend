import React, { useEffect, useState } from 'react';
import { array, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IFormOfferExperience } from '../../../types/forms/post-offer-types/IFormOfferExperience';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import Template from '../../Template';
import RHookFormDataPicker from '../../../common/components/RHookFormDataPicker';

const expSchema = object({
    company_name: string().required('this field is required'),
    job_title: string().required('this field is required'),
    description: string().required('this field is required'),
});

const formSchema = object({
    experience: array().of(expSchema)
});

const Experience = () => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferExperience>({
        resolver: yupResolver(formSchema)
    });

    const { control, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experience',
    });

    const submit: SubmitHandler<IFormOfferExperience> = (data: IFormOfferExperience) => {
        if ( data.experience?.length === 0 ){
           data.experience = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            experience: data.experience
        });
        navigate('/postoffer/projects');
    };

    const [tillNow, setTillNow] = useState<boolean[]>([true]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.checked) {
            let newCheck = [...tillNow];
            newCheck[index] = true;
            setTillNow(newCheck);
            setValue(`experience.${index}.end_date`, 'Till now' );
        } else {
            const newCheck = [...tillNow];
            newCheck[index] = false;
            setTillNow(newCheck);
        }
    };

    useEffect(() => {
        append({ company_name: '', job_title: '', description:'', start_date: new Date(), end_date: 'Till now' });
    }, []);

    return (
        <Template header={'Experience'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id },  index) =>
                        <div key={id} className = 'arrays'>
                            <h4>
                                Job {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Employer" name={`experience.${index}.company_name`} index={index} />
                            <ReactHookFormTextField2 label="Job title" name={`experience.${index}.job_title`} index={index}  />
                            <ReactHookFormTextField2 label="Description" name={`experience.${index}.description`} index={index} rows={4}/>
                            <div className='date-row'>
                                <div className='first-child'>
                                    <RHookFormDataPicker name={`experience.${index}.start_date`} label={'Start date'} views={['year', 'month']} />
                                </div>
                                <div className='second-child'>
                                    <RHookFormDataPicker name={`experience.${index}.end_date`} label={'End date'}  views={['year', 'month']} disable={tillNow[index]} />
                                </div>
                            </div>
                            <FormControlLabel
                                label='Still working'
                                control={<Checkbox
                                    checked={ tillNow[index] ? tillNow[index] : false }
                                    onChange={ (e) => onChange(e, index)}
                                />}
                            />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>
                    )}
                    <Button  type="button" onClick={() => append({ company_name: '', job_title: '', description:'' }) }> Add one more job</Button>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Experience;