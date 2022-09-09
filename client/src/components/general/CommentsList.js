import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCommentContext } from '../../hooks/useCommentContext';
import { Stack, Title } from '@mantine/core';
import Comment from './Comment';

const CommentsList = ({ title, commentData }) => {
    const { user } = useAuthContext();
    const [comments, setComments] = useState(commentData);
    const likedComments = useCommentContext();

    const getLikedState = (id) => {
        return likedComments.includes(id);
    };

    return (
        <Stack mt="lg">
            <Title order={2} size={21}>
                {title}
            </Title>
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment._id}
                        id={comment._id}
                        author={comment.user}
                        comment={comment.comment}
                        createdAt={comment.createdAt}
                        isLikedState={
                            user && likedComments
                                ? getLikedState(comment._id)
                                : false
                        }
                        likes={comment.likes ? comment.likes : 0}
                    />
                );
            })}
        </Stack>
    );
};

export default CommentsList;
