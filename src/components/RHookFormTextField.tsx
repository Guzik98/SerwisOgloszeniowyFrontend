import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { IReactHookFormTextFieldProps } from '../types/form-types';

const ReactHookFormTextField: FC<IReactHookFormTextFieldProps> = ({ label, name }: IReactHookFormTextFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <TextField
            label={label}
            variant="outlined"
            error={!!errors[name]}
            helperText={errors[name]?.message ?? ''}
            fullWidth
            margin="dense"
            {...register(name)}
        />
    );
};

export default ReactHookFormTextField;