import {Link} from 'react-router-dom';
import {classNames} from '../../shared/lib/classNames/classNames';
import cls from './ErrorPage.module.css';
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
            <h1>Error while loading data</h1>
            {message && <p>{message}</p>}
            <Link to={'/'}>Back to main page</Link>
        </div>
    );
});
