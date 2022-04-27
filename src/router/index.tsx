import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Account from '@/pages/account';
import Todo from '@/pages/todo';
import NotFound from '@/pages/notfound';
import Center from '@/pages/center';

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Todo />} />
                <Route path="/center" element={<Center />} />
            </Route>
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)