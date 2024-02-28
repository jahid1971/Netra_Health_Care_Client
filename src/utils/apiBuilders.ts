/* eslint-disable @typescript-eslint/no-explicit-any */

export type TUpdateArgs = {
    id: string;
    data: any;
};

// api builder for create,
export const createApiBuilder = (build:any, url: string, tagTypes: string[]) => {
    return build.mutation({
        query: (args: any) => {
            console.log("args in createApiBuilder", args)
            return {
                url: url,
                method: "POST",
                data: args,
            };
        },
        invalidatesTags: tagTypes,
    });

}


export const updateApiBuilder = (build: any, url: string, tagTypes: string[], method = "PATCH") => {
    return build.mutation({
        query: (args: TUpdateArgs) => {
            console.log("args in updateApiBuilder", args);
            return {
                url: `${url}/${args?.id}`,
                method: method,
                data: args?.data,
            };
        },
        invalidatesTags: tagTypes,
    });
};



export const deleteApiBuilder = (url: string) => {
    return (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
    });
};



export const queryApiBuilder = (url: string) => {
    return (args?: Record<string, any>) => {
        return {
            url: url,
            method: "GET",
            params: args,
        };
    };
};

// api builder for single query
export const singleQueryApiBuilder = (url: string) => {
    return (id: string) => ({
        url: `${url}/${id}`,
        method: "GET",
    });
};
