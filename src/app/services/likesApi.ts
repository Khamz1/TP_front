import {api} from "./api";
import {Like} from "../types";

export const likesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        likePost: builder.mutation<Like, { postId: string }>({
            query: (body) => ({
                url: "/likes",
                method: 'POST',
                body
            })
        }),
        unLikePost: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/likes/${postId} `,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useLikePostMutation,
    useUnLikePostMutation,
} = likesApi;

export const {
    endpoints: {likePost, unLikePost}
} = likesApi