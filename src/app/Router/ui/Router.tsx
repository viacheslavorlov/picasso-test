import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from '../../../pages/Home';
import {SinglePostPage} from '../../../pages/SInglePostPage';
import {ErrorPage} from '@/shared/ui/ErrorPage';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/post/:id'} element={<SinglePostPage />}/>
                <Route path={'*'} element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};
