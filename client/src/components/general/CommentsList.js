import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Stack, Title, Loader, Center } from '@mantine/core';
import Comment from './Comment';

const CommentsList = ({ title, commentData }) => {
    const { user } = useAuthContext();
    const [comments, setComments] = useState(commentData);
    const [likedComments, setLikedComments] = useState(null);

    const getLikedState = (id) => {
        return likedComments.includes(id);
    };

    useEffect(() => {
        const getLikedComments = async () => {
            const response = await fetch(`/api/comments/likes`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                console.error(json.error);
            }

            if (response.ok) {
                setLikedComments(json.likedComments);
            }
        };

        if (user) {
            getLikedComments();
        }
    }, [user]);

    if (user && !likedComments) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }
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
                        isLikedState={user ? getLikedState(comment._id) : false}
                        likes={comment.likes ? comment.likes : 0}
                    />
                );
            })}
        </Stack>
    );
};

export default CommentsList;
