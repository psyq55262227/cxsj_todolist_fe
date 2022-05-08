import { apiGET, apiPOST } from "@/api";
import { getToken, setToken } from "@/utils/token";
import { FC, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "semantic-ui-react";
import Swal from 'sweetalert'

interface IProps {
  onToggle: () => void;
}
const Register: FC<IProps> = ({ onToggle }): ReactElement => {
  let timer: number, counter: number;
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [name, setName] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isSendCode, setIsSendCode] = useState(false);
  const [count, setCount] = useState(60);
  const navigate = useNavigate();
  const handleSendCode = async () => {
    if (isSendCode) return Swal('已发送验证码')
    setIsSendCode(true);
    // handleCounter();
    await apiGET('/verifycode', { phone: account }).then(res => {
      Swal(`验证码是${res.data.verifyCode}`);
      setVerifyCode(res.data.verifyCode)
    }).catch(err => console.log(err))
  }
  const handleRegister = async () => {
    if (confirmPwd !== password) return Swal('前后输入密码不一致')
    if (!confirmPwd || !password || !account || !name || !verifyCode) {
      return Swal({
        title: '出现错误',
        text: '请填写完整信息',
        icon: 'error'
      })
    }
    try {
      const { data: { token } } = await apiPOST('/signup',
        { phone: account, pwd: password, name, verifyCode }
      );
      setToken(token);
      console.log(token)
      Swal({
        title: '注册成功',
        text: '稍后为您跳转到首页',
        icon: 'success'
      }).then(res => navigate('/'))
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (count > 0) {
      counter = window.setTimeout(() => {
        setCount(count - 1);
      }, 1000)
    } else {
      setIsSendCode(false);
      setCount(60)
    }
  }, [count])
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer)
      if (counter) clearInterval(counter)
    }
  }, [])
  return (
    <section className="space-y-6 text-xl">
      <header className="font-bold text-3xl border-l-6 pl-3 border-teal-400">注册</header>
      <main className="flex flex-col space-y-4">
        <Input
          onChange={(e) => setAccount(e.target.value)}
          icon='user circle' iconPosition='left' placeholder='请输入电话号' />
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
        <section className="grid grid-cols-[1fr,auto] gap-4">
          <Input
            onChange={(e) => setVerifyCode(e.target.value)}
            icon='user' iconPosition='left' value={verifyCode} placeholder='请输入验证码'
          />
          <Button color="teal" onClick={() => handleSendCode()}>{isSendCode ? `验证码已发出，再次发出需等待${count}s` : '发送验证码'}</Button>
        </section>
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