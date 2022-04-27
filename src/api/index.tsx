import request from "@/utils/request";

export const apiGET = (url: string, params?: any) => request.get(url, params);
export const apiPOST = (url: string, data?: any) => request.post(url, data);