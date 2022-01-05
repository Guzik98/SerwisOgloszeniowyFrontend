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

const formSchema = object({
    street: string().required('This field ois required'),
    city: string().required('This field ois required'),
})

const Address = () => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer })

    const methods = useForm<IFormOfferAddress>({
        resolver: yupResolver(formSchema),
    })

    const submit: SubmitHandler<IFormOfferAddress> = async (data: IFormOfferAddress) => {
        actions.updateOffer({
            ...state.yourDetails,
            street: data.street,
            city: data.city,
            country_code: data.country_code
        });
        navigate('/postoffer/contact');
    }

    return (
        <Template header={'Address'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)}>
                    <ReactHookFormTextField label="Street" name="street" />
                    <ReactHookFormTextField label="City" name="city" />
                    <RHookFormSelect
                        label='Country code'
                        name='country_code'
                        defaultValue='PL'>
                        {countryCodeInput.map((item) =>
                            <MenuItem key={item.label} value={item.value}>{item.value}</MenuItem>
                        )}
                    </RHookFormSelect>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Address;