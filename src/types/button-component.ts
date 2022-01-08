export type ButtonComponentType = {
    onClick?: (event?: any) => void
    children: string
    filter: boolean
    endIcon?: JSX.Element
    startIcon?: JSX.Element
    role?: string
    width?: string
    justifyContent?: string
}