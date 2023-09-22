import {Link} from 'react-router-dom';
import {classNames} from '../../../lib/classNames/classNames';
import cls from './AppLink.module.css';
import {memo} from 'react';

interface AppLinkProps {
    className?: string;
    title: string;
    to: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        className, to, title
    } = props;

    return (
        <Link to={to} className={classNames(cls.AppLink, className)}>
            {title}
        </Link>
    );
});
