export type ButtonComponentType = {
    onClick?: (event?: any) => void
    childrens: string | JSX.Element
    filter: boolean
    endIcon?: JSX.Element
    startIcon?: JSX.Element
    role?: string
    width?: string
    justifyContent?: string
    height?: string
}