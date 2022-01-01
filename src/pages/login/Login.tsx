import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { IFormLoginProps } from '../../types/form-types';
import ReactHookFormTextField from '../../components/RHookFormTextField';
import '../form-style.sass';
import { login } from '../../services/login';
import { SubmitButtonStyled } from '../../component-styles/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';

const formSchema = object({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
});


const Login: FC = () => {
    let navigate = useNavigate()
    const [errorMessageFromBackend, setErrorMessageFromBackend] = useState<string>();

    const methods = useForm<IFormLoginProps>({
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormLoginProps> = async (data: IFormLoginProps) => {
        await login(data.email, data.password, setErrorMessageFromBackend);
    };

    useEffect( () => {
        if (errorMessageFromBackend === 'logged'){
            navigate('/')
        }
    },[errorMessageFromBackend])

    return (
        <div className='form-root' >
            <div className="form-content">
                <h1 className="form-header">
                    Join us!
                </h1>
                <p>
                    Fill in your email and password to sign in.
                </p>
                {errorMessageFromBackend &&
                <div className="form-error">
                    {errorMessageFromBackend}
                </div>
                }
                <FormProvider {...methods}>
                    <form className='form' onSubmit={methods.handleSubmit(submit)}>
                        <ReactHookFormTextField label="Email" name="email" />
                        <ReactHookFormTextField label="Password" name="password" />
                        <SubmitButtonStyled type="submit" variant="contained" color="primary">
                            SIGN UP
                        </SubmitButtonStyled>
                    </form>
                </FormProvider>

                <Link to={'/register'}>
                    <Button>
                        DON &apos; T HAVE AN ACCOUNT? SIGN UP NOW!
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Login;