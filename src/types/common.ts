import { USER_ROLE } from "@/constants/role";

export interface IMeta {
    page: number;
    limit: number;
    total: number;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface IDrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: any
    child?: IDrawerItem[];
  }