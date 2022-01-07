import React, { useEffect } from 'react';
import { array, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IFormOfferCertificate } from '../../../types/forms/post-offer-types/IFormOfferCertificate';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import Template from '../../Template';

const certificateSchema = object({
    name: string().required('this field is required'),
    institution: string().required('this field is required'),
})

const formSchema = object({
    certificate: array().of(certificateSchema)
})

const Courses = () => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferCertificate>({
        resolver: yupResolver(formSchema)
    })

    const { control } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'certificate',
    })

    const submit: SubmitHandler<IFormOfferCertificate> = (data: IFormOfferCertificate) => {
        console.log('data', data);
        if (data.certificate?.length === 0 ){
           data.certificate = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            certificate: data.certificate
        });
        navigate('/postoffer/experience')
    }

    useEffect(() => {
        append({ name: '', institution: ''})
    },[])

    return (
        <Template header={'Courses'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id}, index) =>
                        <div key={id} className = 'education'>
                            <h4>
                                Courses {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Certificate name" name={`certificate.${index}.name`} index={index} required={true}/>
                            <ReactHookFormTextField2 label="Institution" name={`certificate.${index}.institution`} index={index} required={true} />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>

                    )}
                    <Button  type="button" onClick={() => append({ name: '', institution: '' }) }> Add one more certificate</Button>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Courses;