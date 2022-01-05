import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactHookFormTextField from '../../../common/components/RHookFormTextField';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { IFormOfferPersonalInfo } from '../../../types/forms/post-offer-types/IFormOfferPersonalInfo';
import { TextField } from '@mui/material';
import Template from '../../Template';


const formSchema = object({
    name: string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    surname: string().required('Surname is required'),
    shortDescription: string().min(40).max(300).required(''),
})

const PersonalInfo = () => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferPersonalInfo>({
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormOfferPersonalInfo> = async (data: IFormOfferPersonalInfo) => {
        actions.updateOffer({
            ...state.yourDetails,
            name: data.name,
            surname: data.surname,
            shortDescription: data.shortDescription,
            photo: photo
        });
        navigate('/postoffer/address');
        console.log(state);
    };

    const [ photo, setPhoto]  = useState<File>()

    const handleChangePhoto = (e: any) => {
        setPhoto(e.target?.files[0]);
    };

    return (
        <Template header={'Personal Info'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)}>
                    <ReactHookFormTextField label="Name" name="name" />
                    <ReactHookFormTextField label="Surname" name="surname" />
                    <ReactHookFormTextField label="Short description" name="shortDescription" multiline={true} rows={4} />
                    <TextField variant="outlined" margin="dense" label="Photo" type="file"
                               fullWidth   InputLabelProps={{ shrink: true }} onChange={(e) => { handleChangePhoto(e)}} />
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default PersonalInfo;