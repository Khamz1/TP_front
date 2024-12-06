import React, {useState} from "react";
import {Card as NextUiCard, CardHeader, Spinner, CardBody, CardFooter} from "@nextui-org/react"
import {useLikePostMutation, useUnLikePostMutation} from "../../app/services/likesApi";
import {
    useDeletePostMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery
} from "../../app/services/postsApi";
import {useDeleteCommentMutation} from "../../app/services/commentsApi";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import {User} from "../user";
import {formatToClientDate} from "../../utils/format-to-client-date";
import {RiDeleteBinLine} from "react-icons/ri";
import {Typoghraphy} from "../typography";
import {MetaInfo} from "../meta-info";
import {FcDislike} from "react-icons/fc";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";
import {ErrorMessage} from "../error-message";

type Props = {
    avatarUrl: string
    name: string
    authorId: string
    content: string
    commentId?: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date
    id?: string
    cardFor: 'comment' | 'post' | 'current-post'
    likedByUser?: boolean
}

export const Card: React.FC<Props> = ({

                                          avatarUrl = '',
                                          name = '',
                                          authorId = '',
                                          content = "",
                                          commentId = '',
                                          likesCount = 0,
                                          commentsCount = 0,
                                          createdAt,
                                          id = '',
                                          cardFor = 'post',
                                          likedByUser = false,
                                      }) => {
    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnLikePostMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [deletePost, deletePostStatus] = useDeletePostMutation()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrent)
    return (
        <NextUiCard className='mb-5'>
            <CardHeader
                className='justify-between items-center bg-transparent'>
                <Link to={`/users/${authorId}`}>
                    <User
                        name={name}
                        classname='text-small font-semibold leading-non text-default-600'
                        avatarUrl={avatarUrl}
                        description={createdAt && formatToClientDate(createdAt)}
                    />
                </Link>

                {
                    authorId === currentUser?.id && (
                        <div className="cursor-pointer">
                            {
                                deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                                    <Spinner/>
                                ) : (
                                    <RiDeleteBinLine/>
                                )
                            }
                        </div>
                    )
                }

            </CardHeader>

            <CardBody className="px-3 py-2 mb-5">
                <Typoghraphy>{content}</Typoghraphy>
            </CardBody>
            {

                cardFor !== 'comment' && (
                    <CardFooter className="gap-3">
                        <div className="flex gap-5 items-center">
                            <div>
                                <MetaInfo
                                    count={likesCount}
                                    Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}/>

                            </div>
                            <Link to={`/posts/${id}`}>
                                <MetaInfo count={commentsCount}
                                          Icon={FaRegComment}/>
                            </Link>
                        </div>
                        <ErrorMessage error={error}/>
                    </CardFooter>
                )
            }

        </NextUiCard>

    )
}