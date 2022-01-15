import React from 'react';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormOfferContact } from '../../../types/forms/post-offer-types/IFormOfferContact';
import ReactHookFormTextField from '../../../common/components/RHookFormTextField';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import Template from '../../Template';

const formSchema = object({
    email: string().email().required('Email is required'),
    phone_number: string().length(9, 'Invalid number'),
    github_url: string().url().nullable(),
    linkedin_url: string().url().nullable(),
});

const Contact = () => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferContact>({
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormOfferContact> = ( data: IFormOfferContact) => {
        actions.updateOffer({
            ...state.yourDetails,
            email: data.email,
            phone_number: data.phone_number,
            github_url: data.github_url,
            linkedin_url: data.linkedin_url,
        });
        navigate('/postoffer/education');
    };

    return (
        <Template header={'Contact'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)}>
                    <ReactHookFormTextField label="Email" name="email"/>
                    <ReactHookFormTextField label="Phone number" name="phone_number" type="number"/>
                    <ReactHookFormTextField label="Github" name="github_url" />
                    <ReactHookFormTextField label="Linkedin" name="linkedin_url" />
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Contact;