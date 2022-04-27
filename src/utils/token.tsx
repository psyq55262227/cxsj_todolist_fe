export const getToken = (): string | null => {
    return localStorage.getItem("cxsj_token");
};
export const setToken = (token: string): void => {
    localStorage.setItem("cxsj_token", token);
};
export const delToken = (): void => {
    localStorage.removeItem("cxsj_token");
};