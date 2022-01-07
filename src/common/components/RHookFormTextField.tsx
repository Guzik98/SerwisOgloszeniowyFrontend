import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { IReactHookFormTextFieldProps } from '../../types/forms/buttons/ReactHookFormTextFieldProps';

const ReactHookFormTextField: FC<IReactHookFormTextFieldProps> = ({ label, name, type, rows, multiline, required, defaultValue }: IReactHookFormTextFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <TextField
            multiline={multiline}
            rows={rows}
            label={label}
            required={required}
            variant="outlined"
            defaultValue={defaultValue}
            type={type}
            error={!!errors[name]}
            helperText={errors[name]?.message ?? ''}
            fullWidth
            margin="dense"
            {...register(name)}
        />
    );
};

export default ReactHookFormTextField;