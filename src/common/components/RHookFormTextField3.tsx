import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { IReactHookFormTextFieldProps2 } from '../../types/forms/buttons/ReactHookFormTextFieldProps2';


const ReactHookFormTextField3: FC<IReactHookFormTextFieldProps2> = ({ label, name, type, index, rows, select, children, defaultValue, disable }: IReactHookFormTextFieldProps2) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const nameSplit = name.split('.');

    return (
        <TextField
            select={select}
            label={label}
            variant="outlined"
            disabled={disable}
            type={type}
            rows={rows}
            defaultValue={defaultValue}
            error={errors[nameSplit[0]] ? errors[nameSplit[0]][index] ? !errors[nameSplit[0]][index][nameSplit[2]]?.message  ? !!errors[nameSplit[0]][index][nameSplit[2]][nameSplit[3]]?.message : false :  false : false}
            helperText={errors[nameSplit[0]] ? errors[nameSplit[0]][index] ? errors[nameSplit[0]][index][nameSplit[2]] ? errors[nameSplit[0]][index][nameSplit[2]][nameSplit[3]]?.message ??  '' : '' :  '' : '' }
            fullWidth
            margin="dense"
            {...register(name)}
        >
            {children}
        </TextField>
    );
};

export default ReactHookFormTextField3;