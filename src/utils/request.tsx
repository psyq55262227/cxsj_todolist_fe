import axios from "axios";
import { getToken } from "./token";
const request = axios.create({
    baseURL: "http://localhost:3000",
});
request.interceptors.request.use((config: any) => {
    console.log(config);
    return config;
});
request.interceptors.response.use(
    (config: { headers: { Authorization: string } }) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error: { response: { status: any } }) => {
        if (error.response && error.response.status) {
            let message;
            switch (error.response.status) {
                case 422:
                    message = "未登录";
                    break;
                case 500:
                    message = "服务器内部错误";
                    break;
                default:
                    message = "请求失败";
            }
        }
        return Promise.reject(error);
    }
);
export default request;