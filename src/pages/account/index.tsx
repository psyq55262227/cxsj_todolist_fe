import Logo from "@/pages/account/logo";
import { getToken } from "@/utils/token";
import { FC, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Swal from 'sweetalert'

const Component = (componets: ReactElement, rotate: number) => (
  <section
    style={{ transform: `perspective(900px) rotateY(${rotate}deg) translateY(-50%)` }}
    className="absolute w-full h-full backface-hidden flex items-center justify-center"
  >
    <section className="bg-white shadow-md mr-32 p-8 rounded-md w-full">
      {componets}
    </section>
  </section>
)
const Account: FC = (): ReactElement => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken()) {
      Swal({
        title: '您已登录',
        text: '稍后为您跳转到首页',
      }).then(res => navigate('/'))
    }
  })
  return (
    <section className="h-full grid grid-cols-2 items-center overflow-hidden">
      <Logo />
      <section
        style={{ transform: `perspective(900px) rotateY(${isLogin ? '0' : '180'}deg)` }}
        className="relative preserve-3d transition"
      >
        {Component(<Login onToggle={() => setIsLogin(false)} />, 0)}
        {Component(<Register onToggle={() => setIsLogin(true)} />, 180)}
      </section>
    </section>
  )
}
export default Account;