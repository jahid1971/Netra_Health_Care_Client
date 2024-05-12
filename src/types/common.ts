import { USER_ROLE } from "@/constants/role";
import { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import {
    TypedUseQueryHookResult,
    TypedUseQueryStateResult,
} from "@reduxjs/toolkit/query/react";

export interface IMeta {
    page: number;
    limit: number;
    total: number;
}

export type TDashboardData = {
    appointmentCount: number;
    patientCount: number;
    doctorCount: number;
    paymentCount: number;
    totalRevenue: {
        _sum: {
            amount: number;
        };
    };
    barChartData: {
        month: string; 
        count: number;
    }[];
    pieChartData: {
        status: string;
        count: number;
    }[];
};

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IDrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: any;
    child?: IDrawerItem[];
}

// export type TResponeSuccess = {
//     success?: boolean;
//     data: any;
//     meta: IMeta;
// };

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

export type TResponse<T> = {
    statuscode?: number;
    data: T;
    error?: any;
    meta?: IMeta;
    success?: boolean;
    message?: string;
};

// export type TResponseRedux<T> = TResponse<T> & TypedUseQueryHookResult<T, BaseQueryApi, any>

// export type TResponseRedux<T, QueryArg = any> = TypedUseQueryStateResult<
//     TResponse<T>,
//     QueryArg,
//     BaseQueryFn
// >;

// export type TAxiosResponse<T> = {
//     success: boolean;
//     data: T | null;
//     meta: any | null;
//     message: string;
//     status: number;
// };
