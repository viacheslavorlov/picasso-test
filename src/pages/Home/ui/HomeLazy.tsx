import {HomeProps} from './Home';
import {Loader} from '@/shared/ui/Loader';
import {FC, lazy, Suspense} from 'react';

const HomeLazyPage = lazy<FC<HomeProps>>(() => import('./Home'))


export const HomeLazy = (props: HomeProps) => {
    return (
        <Suspense fallback={<Loader/>}>
            <HomeLazyPage {...props}/>
        </Suspense>
    )
}
