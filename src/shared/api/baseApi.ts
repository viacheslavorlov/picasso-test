import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IPost} from '../../entities/Post/model/type';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: builder => ({
        getPosts: builder.query<IPost, number>({
            query: (pageNumber: number) => `/posts?_limit=20&_page=${pageNumber}`,
            merge(currentCashe, responseData) {
                currentCashe.push(...responseData);
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            forceRefetch({currentArg, previousArg}): boolean {
                return currentArg !== previousArg;
            },
        })
    }),
})

export const {useGetPostsQuery} = baseApi;
