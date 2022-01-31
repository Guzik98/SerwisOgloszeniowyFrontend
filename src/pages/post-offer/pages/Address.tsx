import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactHookFormTextField from '../../../common/components/RHookFormTextField';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { IFormOfferAddress } from '../../../types/forms/post-offer-types/IFormOfferAddress';
import { MenuItem } from '@mui/material';
import { countryCodeInput } from './select-inputs/country-code-input';
import { RHookFormSelect } from '../../../common/components/RHookFormSelect';
import Template from '../../Template';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';

const formSchema = object({
    street: string().required('This field ois required'),
    city: string().required('This field ois required'),
    country_code: string().required('This field ois required')
});

const Address = ({ type }: TemplateTypeChild) => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });
    console.log(state.yourDetails.photo);

    const methods = useForm<IFormOfferAddress>({
        defaultValues: {
            street: state.yourDetails.street,
            city: state.yourDetails.city,
            country_code: state.yourDetails.country_code,
        },
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormOfferAddress> = async (data: IFormOfferAddress) => {
        actions.updateOffer({
            ...state.yourDetails,
            street: data.street,
            city: data.city,
            country_code: data.country_code
        });
        navigate(`/${type}/contact`);
    };

    return (
        <Template header={'Address'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)}>
                    <ReactHookFormTextField label="Street" name="street"  />
                    <ReactHookFormTextField label="City" name="city" />
                    <RHookFormSelect label='Country code' name='country_code' defaultValue={state.yourDetails.country_code} >
                        {countryCodeInput.map((item) =>
                            <MenuItem key={item.label} value={item.value}>{item.value}</MenuItem>
                        )}
                    </RHookFormSelect>
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/personalinfo`)}>
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

export default Address;