export const setTolocalStorage = (key: string, token: string) => {
    if (!key || typeof window === "undefined") return "";

    return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined") return "";

    return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
    if (!key || typeof window === "undefined") return "";

    return localStorage.removeItem(key);
};
