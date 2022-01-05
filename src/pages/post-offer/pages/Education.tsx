import React, { useEffect } from 'react';

import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormOfferEducation } from '../../../types/forms/post-offer-types/IFormOfferEducation';
import ReactHookFormTextField from '../../../common/components/RHookFormTextField';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { Button } from '@mui/material';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { array, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import Template from '../../Template';

const eduSchema = object({
    school_name: string().required('This field is required'),
    degree: string().required('This field is required'),
    area: string().required('This field is required'),
});

const formSchema = object({
    education: array().of(eduSchema)
});

const Education = () => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferEducation>({
        resolver: yupResolver(formSchema)
    });

    const { control } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education',
    });

    const submit: SubmitHandler<IFormOfferEducation> = (data: IFormOfferEducation) => {
        if( data.education?.length === 0 ){
            data.education = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            education: data.education
        });
        navigate('/postoffer/courses');
    }

    useEffect(() => {
        append({ school_name: '', area: '', degree: '' });
    },[]);

    return (
        <Template header={'Education'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id}, index) =>
                        <div key={id} className = 'education'>
                            <h4>
                                Education {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="School name" name={`education.${index}.school_name`} index={index}/>
                            <ReactHookFormTextField2 label="Degree" name={`education.${index}.degree`} index={index} />
                            <ReactHookFormTextField2 label="Area" name={`education.${index}.area`} index={index} />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>

                    )}
                    <Button  type="button" onClick={() => append({ school_name: '', area: '', degree: '' }) }> Add one more education</Button>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Education;