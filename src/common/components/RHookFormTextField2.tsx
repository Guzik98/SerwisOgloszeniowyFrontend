import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { IReactHookFormTextFieldProps2 } from '../../types/forms/buttons/ReactHookFormTextFieldProps2';

const ReactHookFormTextField2: FC<IReactHookFormTextFieldProps2> = ({ label, name, type, index, rows, select, children, defaultValue, required }: IReactHookFormTextFieldProps2) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    let nameSplit = name.split(".");
    return (
        <TextField
            select={select}
            label={label}
            variant="outlined"
            type={type}
            rows={rows}
            multiline={true}
            defaultValue={defaultValue}
            required={required}
            error={errors[nameSplit[0]] ? errors[nameSplit[0]][index] ? !!errors[nameSplit[0]][index][nameSplit[2]]?.message :  false : false}
            helperText={errors[nameSplit[0]] ? errors[nameSplit[0]][index] ? errors[nameSplit[0]][index][nameSplit[2]]?.message ??  '' :  '' : '' }
            fullWidth
            margin="dense"
            {...register(name)}
        >
            {children}
        </TextField>
    );
};

export default ReactHookFormTextField2;