import {PostList} from '@/features/PostList';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Page} from '@/shared/ui/Page';
import cls from './Home.module.css';
import {memo} from 'react';

export interface HomeProps {
    className?: string;
}

const Home = memo((props: HomeProps) => {
    const {
        className
    } = props;

    return (
        <Page className={classNames(cls.Home, className)}>
            <PostList/>
        </Page>
    );
});

export default Home;
