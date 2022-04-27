import { apiPOST } from "@/api";
import { FC, ReactElement, useState } from "react";
import { Input, Button } from "semantic-ui-react";

interface IProps {
    onToggle: () => void;
}
const Register: FC<IProps> = ({ onToggle }): ReactElement => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [name, setName] = useState('');
    const handleRegister = async () => {
        if (confirmPwd !== password) return alert('前后输入密码不一致')
        if (!confirmPwd || !password || !account || !name) return alert('请填写完整信息')
        apiPOST('register', { account, password, name }).then(res => console.log(res)).catch(err => console.log(err))
    }
    return (
        <section className="space-y-6 text-xl">
            <header className="font-bold text-3xl border-l-6 pl-3 border-teal-400">注册</header>
            <main className="flex flex-col space-y-4">
                <Input
                    onChange={(e) => setAccount(e.target.value)}
                    icon='user circle' iconPosition='left' placeholder='请输入用户账号' />
                <Input
                    onChange={(e) => setName(e.target.value)}
                    icon='user' iconPosition='left' placeholder='请输入用户昵称' />
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    icon='lock' iconPosition='left' placeholder='请输入密码' />
                <Input
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    type="password"
                    icon='question circle' iconPosition='left' placeholder='请确认密码' />
                <section
                    className="text-sm ml-auto text-teal-600/70 cursor-pointer"
                    onClick={() => onToggle()}
                >
                    已有账号？立即登录
                </section>
            </main>
            <Button color="teal" fluid onClick={() => handleRegister()}>
                注册
            </Button>
        </section>
    )
}
export default Register;