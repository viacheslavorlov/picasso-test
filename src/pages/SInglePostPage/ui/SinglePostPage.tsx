import {DetaildPostCard} from '@/features/DetaildPostCard';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Page} from '@/shared/ui/Page';
import cls from './SinglePost.module.css';
import {memo} from 'react';

export interface SInglePostPageProps {
    className?: string;
}

const SinglePostPage = memo((props: SInglePostPageProps) => {
    const {
        className
    } = props;

    return (
        <Page className={classNames(cls.SinglePostPage, className)}>
            <DetaildPostCard />
        </Page>
    );
});
export default SinglePostPage;
