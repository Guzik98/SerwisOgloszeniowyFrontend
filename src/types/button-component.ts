export type ButtonComponentType = {
    onClick: () => void
    children: string
    filter: boolean
    endIcon?: JSX.Element
    startIcon?: JSX.Element
}