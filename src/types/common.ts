import { USER_ROLE } from "@/constants/role";

import { IPatient } from "./Patient";
import { IDoctor } from "./Doctors";

export type TUser = {
    id: string;
    email: string;
    role: TUserRole;
    name: string;
    needPasswordChange?: boolean;
    profilePhoto?: string;
    userId?: string;
} & Partial<IPatient> &
    Partial<IDoctor>;

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
    totalRevenue: number;
    appointmentsPieData: {
        status: string;
        count: number;
    }[];
    barChartData?: {
        month: string;
        count: number;
    }[];
    pieChartData?: {
        status: string;
        count: number;
    }[];
};

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IDrawerItem {
    title: string;
    path?: string;
    icon?: any;
    childItems?: IDrawerItem[];
}

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

export type TQuery<T = Record<string, unknown>> = {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    [key: string]: any;
} & Partial<T>;

export type TChatMessage = {
    id?: string;
    senderId: string;
    receiverId: string;
    message: string;
    type?: "text" | "file" | "image";
    read?: boolean;
    createdAt?: Date;
};
