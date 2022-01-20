import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ReactHookFormDataPickerType } from '../../types/forms/buttons/ReactHookFormDataPicker';

const RHookFormDataPicker = ({ name, label, disable, views }: ReactHookFormDataPickerType) => {

    const {
        control,
        setValue,
    } = useFormContext();

    const onChange = (e: Date) => {
        setValue(name,  e);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <DatePicker
                        views={views}
                        label={label}
                        disabled={disable}
                        maxDate={new Date()}
                        onChange={(e) => onChange(e)}
                        renderInput={(params) => <TextField style={{ marginTop: '8px' }} fullWidth {...params} helperText={null} error={false} />}
                        value={field.value}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default RHookFormDataPicker;