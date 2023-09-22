import {memo, useState,} from 'react';
import {Virtuoso} from 'react-virtuoso';
import {IPost, Post} from '@/entities/Post';
import {ErrorBoundary} from '@/shared/ui/ErrorBoundary';
import {useGetPostsQuery} from '../model/fetchPostsEndpoint';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Loader} from '@/shared/ui/Loader';
import {VStack} from '@/shared/ui/Stack';
import {ErrorPage} from '@/shared/ui/ErrorPage';
import cls from './PostList.module.css';

interface PostListProps {
    className?: string;
}

const Header = () => <h1 className={cls.title}>Список постов</h1>;

export const PostList = memo((props: PostListProps) => {
    const {className} = props;
    const [page, setPage] = useState(1);
    const {isFetching, data, isError} = useGetPostsQuery(page);

    const onLoadMore = () => {
        if (!isFetching) {
            setPage(prevState => prevState + 1);
        }
    };
    const Footer = () => isFetching ? <Loader/> : <div/>;
    if (isError && !isFetching) {
        return <ErrorPage/>;
    }

    return (
        <VStack max gap={'8'} className={classNames(cls.PostList, className)}>
            <Header/>
            <ErrorBoundary>
            <Virtuoso
                style={{height: 'calc(100vh - 150px)', width: '100%'}}
                data={data}
                components={{
                    Footer
                }}
                overscan={100}
                endReached={onLoadMore}
                itemContent={(_, post) => <Post
                    key={post.id}
                    className={
                        classNames(post.id % 2 === 0 ? cls.even : cls.odd, cls.post)
                    }
                    post={post as IPost}/>}
            />
            </ErrorBoundary>
        </VStack>
    );
});
