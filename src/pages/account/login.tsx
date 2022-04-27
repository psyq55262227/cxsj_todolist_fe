import { apiPOST } from "@/api";
import { FC, ReactElement, useState } from "react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Input from "semantic-ui-react/dist/commonjs/elements/Input/Input";

interface IProps {
    onToggle: () => void;
}
const Login: FC<IProps> = ({ onToggle }): ReactElement => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        if (!account || !password) return alert('请填写完整信息')
        // apiPOST('login', { account, password }).then(res => console.log(res)).catch(err => console.log(res))
    }
    return (
        <section className="space-y-6 text-xl">
            <header className="font-bold text-3xl border-l-6 pl-3 border-yellow-400">登录</header>
            <main className="flex flex-col space-y-4">
                <Input
                    onChange={(e) => setAccount(e.target.value)}
                    icon='user' iconPosition='left' placeholder='请输入用户账号' />
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    icon='lock' iconPosition='left' placeholder='请输入密码' />
                <section
                    className="text-sm ml-auto text-yellow-600/70 cursor-pointer"
                    onClick={() => onToggle()}
                >
                    没有账号？立即注册
                </section>
            </main>
            <Button color="yellow" fluid onClick={() => handleLogin()}>
                登录
            </Button>
        </section>
    )
}
export default Login;