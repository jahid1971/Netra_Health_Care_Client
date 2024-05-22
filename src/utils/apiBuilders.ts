/* eslint-disable @typescript-eslint/no-explicit-any */

import { TResponse } from "@/types/common";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

type IBuildApi = EndpointBuilder<any, any, any>;

export type TUpdateArgs = {
    id?: string;
    data: any;
};

// api builder for create,
export const createApiBuilder = (
    build: any,
    url: string,
    tagTypes?: string[]
) => {
    return build.mutation({
        query: (args: any) => {
            console.log("args in createApiBuilder", args);
            return {
                url: url,
                method: "POST",
                data: args,
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const updateApiBuilder = (
    build: IBuildApi,
    url: string,
    tagTypes: string[],
    options: { method?: string; contentType?: string } = {}
) => {
    return build.mutation<any, TUpdateArgs>({
        query: (args) => {
            console.log("args in updateApiBuilderrrrr", args);
            return {
                url: `${url}${args.id ? `/${args.id}` : ""}`,
                method: options.method ?? "PATCH",
                data: args?.data,
                contentType: options.contentType ?? "application/json",
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const queryApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes?: string[]
) => {
    return build.query<TResponse<T>, Record<string, any> | undefined>({
        query: (args?: Record<string, any>) => {
            return {
                url: url,
                method: "GET",
                params: args,
            };
        },
        providesTags: tagTypes,

        // transformResponse: (response: any) => {
        //     return {
        //         data: response?.data?.data ?? response?.data,
        //         meta: response?.data?.meta,
        //     }

        // }
    });
};

export const singleQueryApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes?: string[]
) => {
    return build.query<TResponse<T>, { id?: string }>({
        query: (args) => {
            return {
                url: `${url}/${args?.id}`,
                method: "GET",
            };
        },
        providesTags: tagTypes,
    });
};

export const deleteApiBuilder = (
    build: any,
    url: string,
    tagTypes: string[]
) => {
    return build.mutation({
        query: (id: string) => {
            return {
                url: `${url}/${id}`,
                method: "DELETE",
            };
        },
        invalidatesTags: tagTypes,
    });
};
