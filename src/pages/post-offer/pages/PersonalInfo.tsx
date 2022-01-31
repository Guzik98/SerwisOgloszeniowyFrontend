import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactHookFormTextField from '../../../common/components/RHookFormTextField';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { IFormOfferPersonalInfo } from '../../../types/forms/post-offer-types/IFormOfferPersonalInfo';
import Template from '../../Template';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';

const formSchema = object({
    name: string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    surname: string().required('Surname is required'),
    short_personal_description: string().min(40).max(300).required(''),
});

const PersonalInfo = ({ type }: TemplateTypeChild): JSX.Element => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferPersonalInfo>({
        defaultValues: {
            name: state.yourDetails.name,
            surname: state.yourDetails.surname,
            short_personal_description: state.yourDetails.short_personal_description,
            photo: undefined
        },
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormOfferPersonalInfo> = async (data: IFormOfferPersonalInfo) => {
        actions.updateOffer({
            ...state.yourDetails,
            name: data.name,
            surname: data.surname,
            short_personal_description: data.short_personal_description,
            photo: data.photo
        });
        navigate(`/${type}/address`);
        console.log(state);
    };


    return (
        <Template header={'Personal Info'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)}>
                    <ReactHookFormTextField label="Name" name="name"/>
                    <ReactHookFormTextField label="Surname" name="surname"/>
                    <ReactHookFormTextField label="Short description" name="short_personal_description" multiline={true} rows={4}/>
                    <ReactHookFormTextField label="Photo" type="file" name="photo" shrink={true}/>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default PersonalInfo;