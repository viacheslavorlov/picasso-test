import {Loader} from '@/shared/ui/Loader';
import {SInglePostPageProps} from './SinglePostPage';
import {FC, lazy, Suspense} from 'react';

const SinglePostLazy = lazy<FC<SInglePostPageProps>>(() => import('./SinglePostPage'))

export const SinglePostPageLazy = (props: SInglePostPageProps) => {
    return (
        <Suspense fallback={<Loader/>}>
            <SinglePostLazy {...props}/>
        </Suspense>
    )
}
