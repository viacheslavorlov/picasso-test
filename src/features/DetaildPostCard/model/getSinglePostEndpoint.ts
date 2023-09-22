import {IPost} from '@/entities/Post';
import {baseApi} from '@/shared/api/baseApi';

const getSinglePostEndpoint = baseApi.injectEndpoints({
    endpoints: builder => ({
        getSinglePost: builder.query<IPost, string>({
            query: (id) => `/posts/${id}`,
        }),
    })
})

export const {useGetSinglePostQuery} = getSinglePostEndpoint;
