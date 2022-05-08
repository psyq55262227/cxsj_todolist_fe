import { apiPOST } from "@/api";
import { setToken } from "@/utils/token";
import { FC, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Input from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import swal from "sweetalert";
import Swal from "sweetalert";

interface IProps {
  onToggle: () => void;
}
const Login: FC<IProps> = ({ onToggle }): ReactElement => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!account || !password) return Swal({ title: '出现问题', text: '请填写完整信息', icon: 'error' });
    try {
      const { data: { token } } = await apiPOST('/login', { phone: account, pwd: password });
      setToken(token);
      swal({
        title: '登录成功',
        text: '将为您跳转至首页',
        icon: 'success'
      }).then((res) => navigate('/'))
    } catch (e) {
      console.log(e);
    }
    // apiPOST('login', { account, password }).then(res => console.log(res)).catch(err => console.log(res))
  }
  return (
    <section className="space-y-6 text-xl">
      <header className="font-bold text-3xl border-l-6 pl-3 border-yellow-400">登录</header>
      <main className="flex flex-col space-y-4">
        <Input
          onChange={(e) => setAccount(e.target.value)}
          icon='user' iconPosition='left' placeholder='请输入手机号' />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          icon='lock'
          iconPosition='left'
          type="password"
          placeholder='请输入密码' />
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