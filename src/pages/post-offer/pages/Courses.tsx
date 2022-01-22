import React, { useEffect } from 'react';
import { array, object, string, date } from 'yup';
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
import RHookFormDataPicker from '../../../common/components/RHookFormDataPicker';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';

const certificateSchema = object({
    name: string().required('this field is required'),
    institution: string().required('this field is required'),
    end_date: (date() || string()).required('this field is required')
});

const formSchema = object({
    certificate: array().of(certificateSchema)
});

const Courses = ({ type }: TemplateTypeChild) => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferCertificate>({
        defaultValues: {
            certificate: state.yourDetails.certificate,
        },
        resolver: yupResolver(formSchema)
    });

    const { control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'certificate',
    });

    const submit: SubmitHandler<IFormOfferCertificate> = (data: IFormOfferCertificate) => {
        console.log('data', data);
        if (data.certificate?.length === 0 ){
           data.certificate = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            certificate: data.certificate
        });
        navigate(`/${type}/experience`);
    };

    useEffect(() => {
        if ( state.yourDetails.certificate === null){
            append({ name: '', institution: '', end_date: new Date() });
        }
    }, []);

    return (
        <Template header={'Courses'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id }, index) =>
                        <div key={id} className = 'arrays'>
                            <h4>
                                Courses {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Certificate name" name={`certificate.${index}.name`} index={index}/>
                            <ReactHookFormTextField2 label="Institution" name={`certificate.${index}.institution`} index={index}/>
                            <RHookFormDataPicker name={`certificate.${index}.end_date`} label={'End course date'} index={index} views={['year']} />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>

                    )}
                    <Button  type="button" onClick={ () => append({ name: '', institution: '' }) }> Add one more certificate</Button>
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/education`)}>
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

export default Courses;