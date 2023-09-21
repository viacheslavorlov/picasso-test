import {classNames} from '../../../shared/lib/classNames/classNames';
import cls from './SinglePost.module.css';
import {memo} from 'react';

interface SInglePostPageProps {
    className?: string;
}

export const SinglePostPage = memo((props: SInglePostPageProps) => {
    const {
        className
    } = props;

    return (
        <div className={classNames(cls.SinglePostPage, className)}>
            <h1>Single post page</h1>
        </div>
    );
});
