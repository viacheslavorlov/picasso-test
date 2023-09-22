import {classNames} from '../../../lib/classNames/classNames';
import cls from './ErrorPage.module.css';
import {AppLink} from '../../AppLink';
import {memo} from 'react';

interface ErrorPageProps {
    className?: string;
    message?: string
}

export const ErrorPage = memo((props: ErrorPageProps) => {
    const {
        className, message
    } = props;

    return (
        <div className={classNames(cls.ErrorPage, className)}>
            <h1>Что то пошло не так...</h1>
            {message && <p>{message}</p>}
            <AppLink to={'/'} title={'Вернуться на главную страницу'}/>
        </div>
    );
});
