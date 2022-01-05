import { string } from 'yup';

export type IReactHookFormSelectProps = {
    name: string;
    label: string
    defaultValue: string;
    children: JSX.Element[];
}