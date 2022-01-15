import React, { FC, useEffect, useState } from 'react';
import { object, string } from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField from '../../common/components/RHookFormTextField';
import { SubmitButtonStyled, SubmitButtonStyled2 } from '../../common/component-styles/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../services/register-request';
import { IFormRegisterProps } from '../../types/forms/IFormRegisterProps';
import Template from '../Template';

const formSchema = object({
    name: string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: string().email().required('Email is required'),
    password: string().min(8, 'Password must be at least 8 characters').max(32, 'Password must be at most 32 characters').required('Password is required'),
});

const Register: FC = () => {
    const navigate = useNavigate();
    const [errorMessageFromBackend, setErrorMessageFromBackend] = useState<string>();

    const methods = useForm<IFormRegisterProps>({
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormRegisterProps> = async (data: IFormRegisterProps) => {
        registerRequest(data.name, data.email, data.password, setErrorMessageFromBackend);
    };

    useEffect(() => {
        if (errorMessageFromBackend === 'register'){
            navigate('/login');
        }
    }, [errorMessageFromBackend]);

    return (
        <Template header={'Join us!'} p={'Start looking for new future with us.'}>
            <>
                {errorMessageFromBackend &&
                <div className="form-error">
                    {errorMessageFromBackend}
                </div>
                }
                <FormProvider {...methods}>
                    <form className='form' onSubmit={methods.handleSubmit(submit)}>
                        <ReactHookFormTextField label="Name" name="name" />
                        <ReactHookFormTextField label="Email" name="email" />
                        <ReactHookFormTextField label="Password" name="password" type="password" />
                        <SubmitButtonStyled type="submit" variant="contained" color="primary">
                            SIGN UP
                        </SubmitButtonStyled>
                    </form>
                </FormProvider>
                <SubmitButtonStyled2 onClick={ () => navigate('/login')}>
                    Sign In
                </SubmitButtonStyled2>
            </>
        </Template>
    );


};

export default Register;