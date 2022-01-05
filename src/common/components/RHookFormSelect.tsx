import React, { FC } from 'react';
import { IReactHookFormSelectProps } from '../../types/forms/buttons/IReactHookFormSelectProps';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';


export const RHookFormSelect: FC<IReactHookFormSelectProps> = ({ label, name, defaultValue, children }: IReactHookFormSelectProps ) => {

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
