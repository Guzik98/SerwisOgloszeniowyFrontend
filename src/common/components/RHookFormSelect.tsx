import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IReactHookFormTextFieldProps } from '../../types/forms/buttons/ReactHookFormTextFieldProps';


export const RHookFormSelect: FC<IReactHookFormTextFieldProps> = ({ label, name, defaultValue, children }: IReactHookFormTextFieldProps ) => {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <TextField
            {...register(`${name}`)}
            select
            label={label}
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors[name]}
            helperText={errors[name]?.message ?? ''}
            defaultValue={defaultValue}
        >
            {children}
        </TextField>
    );
};
