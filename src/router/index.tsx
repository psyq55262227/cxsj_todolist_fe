import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from '@/App';
import Account from '@/pages/account';
import Todo from '@/pages/todo';
import NotFound from '@/pages/notfound';
import Center from '@/pages/center';
import Assign from '@/pages/assign';
import {
  SwitchTransition,
  CSSTransition
} from "react-transition-group";

export const Router = () => {
  // const location = useLocation();
  return (
    <BrowserRouter>
      <SwitchTransition>
        <CSSTransition
          key={Math.random()}
          classNames="animate-ping"
          timeout={300}
        >
          <Routes>
            <Route path="/" element={<App />} >
              <Route index element={<Todo />} />
              <Route path="/center" element={<Center />} />
              <Route path="/assign" element={<Assign />} />
            </Route>
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </BrowserRouter>
  )
}