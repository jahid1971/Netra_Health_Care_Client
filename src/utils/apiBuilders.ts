/* eslint-disable @typescript-eslint/no-explicit-any */

// api builder for create,
export const createApiBuilder = (url: string) => {
    return (data: any) => ({
        url: url,
        method: "POST",
        data,
    });
};

// api builder for update
export const updateApiBuilder = (url: string, method = "PATCH") => {
    return (args: { data?: any; id?: string }) => ({
        url: `${url}/${args?.id}`,
        method: method,
        body: args?.data,
    });
};

export const deleteApiBuilder = (url: string) => {
    return (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
    });
};

// api builder for query

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
