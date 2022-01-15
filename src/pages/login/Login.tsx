import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, FormProvider, useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import ReactHookFormTextField from '../../common/components/RHookFormTextField';
import '../form-style.sass';
import {  loginRequest } from '../../services/login-request';
import { SubmitButtonStyled } from '../../common/component-styles/SubmitButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { IFormLoginProps } from '../../types/forms/IFormLoginProps';
import Template from '../Template';

const formSchema = object({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
});

const Login: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [errorMessageFromBackend, setErrorMessageFromBackend] = useState<string>();

    const methods = useForm<IFormLoginProps>({
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<IFormLoginProps> = async (data: IFormLoginProps) => {
        loginRequest(data.email, data.password, setErrorMessageFromBackend);
    };

    useEffect(() => {
        if (errorMessageFromBackend === 'logged'){
            login();
            navigate('/');
        }
    }, [errorMessageFromBackend]);

    return (
        <Template header={'Join us!'}  p ={'Fill in your email and password to sign in.'}>
          <>
              {errorMessageFromBackend &&
              <div className="form-error">
                  {errorMessageFromBackend}
              </div>
              }
              <FormProvider {...methods}>
                  <form className='form' onSubmit={methods.handleSubmit(submit)}>
                      <ReactHookFormTextField label="Email" name="email" />
                      <ReactHookFormTextField label="Password" name="password" type="password" />
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
          </>
        </Template>
    );
};

export default Login;