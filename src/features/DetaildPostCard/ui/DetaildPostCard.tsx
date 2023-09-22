import {classNames} from '@/shared/lib/classNames/classNames';
import {Loader} from '@/shared/ui/Loader';
import {VStack} from '@/shared/ui/Stack';
import {memo} from 'react';
import {useParams} from 'react-router-dom';
import {AppLink} from '@/shared/ui/AppLink';
import {ErrorBoundary} from '@/shared/ui/ErrorBoundary';
import {ErrorPage} from '@/shared/ui/ErrorPage';
import {useGetSinglePostQuery} from '../model/getSinglePostEndpoint';
import cls from './DetaildPostCard.module.css';

interface DetaildPostCardProps {
    className?: string;
}

export const DetaildPostCard = memo((props: DetaildPostCardProps) => {
    const {
        className,
    } = props;

    const {id} = useParams();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {isFetching, isError, data} = useGetSinglePostQuery(id);

    if (isError) {
        return <ErrorPage/>;
    }

    if (isFetching) {
        return <Loader/>;
    }

    return (
        <VStack max className={classNames(cls.DetaildPostCard, className)}>
            <ErrorBoundary>
            {data && !isError && (
                <>
                    <div className={cls.title}>{data.id}. {data.title}.</div>
                    <div className={cls.body}>{data.body}</div>
                    <AppLink to={'/'} className={cls.backButton} title={'Назад к постам'}/>
                </>
            )}
            </ErrorBoundary>
        </VStack>
    );
});
