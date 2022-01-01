import { UseFormReturn } from 'react-hook-form';

export type IFormLoginProps = {
    email: string;
    password: string;
}

export type IReactHookFormTextFieldProps = {
    methods: UseFormReturn;
    label: string;
    name: string;
}

export type ReactHookFormTextFieldContainerProps = {
    name: string;
    label: string;
}