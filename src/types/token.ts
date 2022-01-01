import { RoleEnum } from '../enums/role';

export type Token = {
    username: string
    role : RoleEnum
    iat: number
    exp: number
};

