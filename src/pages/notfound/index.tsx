import { getToken } from "@/utils/token";
import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

const NotFound: FC = (): ReactElement => {
    let timer: number;
    const navigate = useNavigate();
    const handleRedirect = () => {
        if (getToken()) {
            navigate('/')
        }
        navigate('/account')
    }
    useEffect(() => {
        timer = window.setTimeout(() => {
            handleRedirect()
        }, 2000);
        return () => {
            clearTimeout(timer)
        }
    }, []);
    return <section className="h-full flex justify-center items-center text-xl">
        <section className="flex space-y-4 bg-yellow-200 p-16 rounded-2xl text-yellow-800 shadow-md flex-col">
            <span>您访问的路径不存在哦~稍后为您返回首页</span>
            <Button color="yellow" onClick={() => handleRedirect()}>点此直接返回首页</Button>
        </section>
    </section>
}
export default NotFound;