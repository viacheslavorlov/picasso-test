import {memo,} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Virtuoso} from 'react-virtuoso';
import {Post} from '../../../entities/Post/ui/Post';
import {useGetPostsQuery} from '../../../shared/api/baseApi';
import {classNames} from '../../../shared/lib/classNames/classNames';
import {Loader} from '../../../shared/ui/Loader';
import {VStack} from '../../../shared/ui/Stack';
import {ErrorPage} from '../../../Widgets/ErrorPage/ErrorPage';
import {pageSelector} from '../model/selectors/pageSelectors';
import {pageLiseActions} from '../model/slice/pageSlise';
import cls from './PostList.module.css';

interface PostListProps {
    className?: string;
}

const Header = () => <h1 className={cls.title}>Список постов</h1>;

export const PostList = memo((props: PostListProps) => {
    const {className} = props;
    const dispatch = useDispatch();
    const page = useSelector(pageSelector);
    const {isFetching, data, isError} = useGetPostsQuery(page);

    const onLoadMore = () => {
        if (!isFetching) {
            dispatch(pageLiseActions.increasePage());
        }
    };

    if (isError && !isFetching) {
        return <ErrorPage/>;
    }

    return (
        <VStack max gap={'8'} className={classNames(cls.PostList, className)}>
            {isFetching && page === 1 && <Loader/>}
            {!isFetching && !isError && <Virtuoso
				style={{height: 'calc(100vh - 150px)', width: '100%'}}
				data={data}
				totalCount={data.length}
				components={{
                    Header,
                }}
				endReached={onLoadMore}
				overscan={200}
				listClassName={cls.PostList}
				itemContent={(index, post) => <Post key={post.id} className={cls.post} post={post}/>}
			/>
            }
        </VStack>
    );
});
