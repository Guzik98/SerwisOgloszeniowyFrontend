import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IReactHookFormTextFieldProps } from '../../types/forms/buttons/ReactHookFormTextFieldProps';


export const RHookFormSelect: FC<IReactHookFormTextFieldProps> = ({ label, name, defaultValue, children }: IReactHookFormTextFieldProps ) => {

    const { register } = useFormContext();

    return (
        <TextField
            {...register(`${name}`)}
            select
            label={label}
            variant="outlined"
            fullWidth
            margin="dense"
            defaultValue={defaultValue}
        >
            {children}
        </TextField>
    );
};
