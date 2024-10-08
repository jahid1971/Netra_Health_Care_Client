import { USER_ROLE } from "@/constants/role";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface IMeta {
    page: number;
    limit: number;
    total: number;
}

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IDrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: any;
    child?: IDrawerItem[];
}

export type TResponeSuccess = {
    success?: boolean;
    data: any;
    meta: IMeta;
    
};

export type TOpenState = {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IGenericErrorResponse = {
    status: number;
    errorType: string;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type IResponse<T> = {
    data?: T;
    error?: any;
    meta?: IMeta;
    success: boolean;
    message: string;
};
export type IResponseRedux<T> = IResponse<T> & BaseQueryApi;
