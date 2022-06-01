import { delToken } from "@/utils/token";
import { FC, ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownHeader, DropdownItem, DropdownMenu, Icon, Menu, MenuItem, SemanticICONS } from "semantic-ui-react";
import Notify from "./notify";

const Header: FC = (): ReactElement => {
  const navigate = useNavigate();
  const paths: {
    name: string,
    icon: SemanticICONS,
    path: string
  }[] = [
      {
        name: '待做清单',
        icon: 'list',
        path: '/'
      }, {
        name: '指派任务',
        icon: 'users',
        path: '/assign'
      }, {
        name: '个人中心',
        icon: 'user circle',
        path: '/center'
      },
    ];
  const assignment = [
    "任务1", "任务2"
  ]
  const handleLogOut = () => {
    delToken();
    navigate('/account')
  }
  return (
    <section className="bg-hex-454d66 p-6 text-xl flex justify-between">
      <section className="space-x-4">
        {
          paths.map(({ name, icon, path }) => (
            <NavLink to={path} key={path} className={({ isActive }) => `transition hover:text-hex-efeeb4 px-4 py-2 ${isActive ? 'text-hex-e6f4e8 rounded-md bg-gray-200/20' : 'text-gray-400'}`}>
              <Icon name={icon} />
              <span>{name}</span>
            </NavLink>
          ))
        }
      </section>
      <section className="flex space-x-4">
        <section className="text-gray-400 hover:text-gray-100 cursor-pointer transition">
          <Notify />
        </section>
        <section className="text-gray-400 hover:text-gray-100 cursor-pointer transition" onClick={() => handleLogOut()}>
          <Icon name="sign-out" />
          <span>退出</span>
        </section>
      </section>
    </section>
  )
}
export default Header;