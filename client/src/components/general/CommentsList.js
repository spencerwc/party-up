import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Title, Loader, Center, createStyles, Stack } from '@mantine/core';
import Comment from './Comment';

const useStyles = createStyles((theme) => ({
    comments: {
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        padding: 0,
        margin: 0,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gap: theme.spacing.md,
            marginLeft: theme.spacing.md,
            marginRight: theme.spacing.md,
        },
    },
}));

const CommentsList = ({ title, commentData }) => {
    const { user } = useAuthContext();
    const { classes } = useStyles();
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
        <Stack>
            <Title order={2} size={20} ml="md">
                {title}
            </Title>
            <ul className={classes.comments}>
                {comments.map((comment) => {
                    return (
                        <li key={comment._id}>
                            <Comment
                                id={comment._id}
                                author={comment.user}
                                comment={comment.comment}
                                createdAt={comment.createdAt}
                                isLikedState={
                                    user ? getLikedState(comment._id) : false
                                }
                                likes={comment.likes ? comment.likes : 0}
                            />
                        </li>
                    );
                })}
            </ul>
        </Stack>
    );
};

export default CommentsList;
