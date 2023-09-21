import {PostList} from '../../../features/PostList/ui/PostList';
import {classNames} from '../../../shared/lib/classNames/classNames';
import cls from './Home.module.css';
import {memo} from 'react';

interface HomeProps {
    className?: string;
}

export const Home = memo((props: HomeProps) => {
    const {
        className
    } = props;

    return (
        <div className={classNames(cls.Home,className)}>
            <PostList/>
        </div>
    );
});
