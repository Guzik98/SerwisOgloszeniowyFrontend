export type IReactHookFormTextFieldProps ={
    label: string;
    name: string;
    type?: string
    index?: number
    rows?: number
    defaultValue?: string | number
    select?: boolean,
    children?: JSX.Element[]
    required?: boolean
    multiline?: boolean
}