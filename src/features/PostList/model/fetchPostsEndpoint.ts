import {IPost} from '@/entities/Post';
import {baseApi} from '@/shared/api/baseApi';

export const fetchPostsEndpoint = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<IPost[], number>({
            query: (pageNumber) => {
                return `/posts?_limit=20&_page=${pageNumber}`;
            },
            merge(currentCashe, responseData) {
                currentCashe.push(...responseData);
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            }
        })
    }),
    overrideExisting: true,
});

export const {useGetPostsQuery} = fetchPostsEndpoint;
