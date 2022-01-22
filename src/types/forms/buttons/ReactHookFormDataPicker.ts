import { DatePickerView } from '@mui/lab/DatePicker/shared';

export type ReactHookFormDataPickerType = {
    name: string
    label: string
    disable?: boolean
    views: DatePickerView[] | undefined
    index: number
}