import React, { useEffect, useState } from 'react';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormOfferEducation } from '../../../types/forms/post-offer-types/IFormOfferEducation';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { array, object, string, date } from 'yup';
import { useNavigate } from 'react-router-dom';
import Template from '../../Template';
import RHookFormDataPicker from '../../../common/components/RHookFormDataPicker';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';

const eduSchema = object({
    school_name: string().required('This field is required'),
    degree: string().required('This field is required'),
    area: string().required('This field is required'),
    start_date: date().required('this field is required'),
});

const formSchema = object({
    education: array().of(eduSchema)
});

const Education = ({ type }: TemplateTypeChild) => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferEducation>({
        defaultValues: {
            education: state.yourDetails.education,
        },
        resolver: yupResolver(formSchema)
    });

    const { control, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education',
    });

    const submit: SubmitHandler<IFormOfferEducation> = (data: IFormOfferEducation) => {
        if ( data.education?.length === 0 ){
            data.education = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            education: data.education
        });
        navigate(`/${type}/courses`);
    };

    const [tillNow, setTillNow] = useState<boolean[]>([true]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.checked) {
            const newCheck = [...tillNow];
            newCheck[index] = true;
            setTillNow(newCheck);
            setValue(`education.${index}.end_date`, 'Till now' );
        } else {
            const newCheck = [...tillNow];
            setValue(`education.${index}.end_date`, new Date());
            newCheck[index] = false;
            setTillNow(newCheck);
        }
    };

    useEffect(() => {
        if ( state.yourDetails.education === null){
            append({ school_name: '', area: '', degree: '', start_date: new Date(), end_date: 'Till now' });
        }
    }, []);

    return (
        <Template header={'Education'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id }, index) =>
                        <div key={id} className = 'arrays'>
                            <h4>
                                Education {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="School name" name={`education.${index}.school_name`} index={index}/>
                            <ReactHookFormTextField2 label="Degree" name={`education.${index}.degree`}  index={index} />
                            <ReactHookFormTextField2 label="Area" name={`education.${index}.area`}  index={index} />
                            <div className='date-row'>
                                <div className='first-child'>
                                    <RHookFormDataPicker name={`education.${index}.start_date`} label={'Start date'} views={['year']} index={index} />
                                </div>
                                <div className='second-child'>
                                    <RHookFormDataPicker name={`education.${index}.end_date`} label={'End date'} views={['year']} index={index} disable={tillNow[index]}  />
                                </div>
                            </div>
                            <FormControlLabel
                                label='In progress'
                                control={<Checkbox
                                    checked={ tillNow[index] ? tillNow[index] : false }
                                    onChange={ (e) => onChange(e, index)}
                                />}
                            />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>
                    )}
                    <Button  type="button" onClick={() => append({ school_name: '', area: '', degree: '', start_date: new Date(), end_date: 'Till now' }) }> Add one more education</Button>
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/contact`)}>
                            Previous
                        </SubmitButtonStyled>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
                            Next
                        </SubmitButtonStyled>
                    </div>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Education;