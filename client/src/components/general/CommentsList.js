import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import {
    Title,
    Loader,
    Center,
    createStyles,
    Stack,
    Group,
    Button,
    Select,
    Text,
    Box,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import Comment from './Comment';
import CommentForm from './CommentForm';

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

const CommentsList = ({ title, commentData, uri }) => {
    const { user } = useAuthContext();
    const { classes } = useStyles();
    const [comments, setComments] = useState(commentData);
    const [likedComments, setLikedComments] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const [sortStyle, setSortStyle] = useState('Most recent');

    const handleSort = () => {
        switch (sortStyle) {
            case 'Oldest': {
                return comments.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
            }
            case 'Most liked': {
                return comments.sort((a, b) => b.likes - a.likes);
            }
            default:
                return comments.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
        }
    };

    const getLikedState = (id) => {
        return likedComments.includes(id);
    };

    const addComment = async (comment) => {
        setIsPending(true);

        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setComments([json, ...comments]);
        }

        setIsPending(false);
    };

    const deleteComment = async (commentId) => {
        setIsPending(true);

        const response = await fetch(`${uri}/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setComments(
                comments.filter((comment) => comment._id !== commentId)
            );
        }

        setIsPending(false);
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
            <Group position="apart">
                <Title order={2} size={20} ml="md">
                    {title}
                </Title>

                {user && (
                    <Button
                        compact
                        leftIcon={<IconPencil size={16} />}
                        onClick={() => setDisplayForm(!displayForm)}
                        mx="md"
                        radius="md"
                    >
                        Add a comment
                    </Button>
                )}
            </Group>

            {user && displayForm && (
                <CommentForm
                    addComment={addComment}
                    isPending={isPending}
                    error={error}
                    setDisplayForm={setDisplayForm}
                />
            )}

            {comments.length > 0 ? (
                <>
                    {!displayForm && (
                        <Select
                            value={sortStyle}
                            onChange={setSortStyle}
                            data={['Most recent', 'Oldest', 'Most liked']}
                            radius="md"
                            mx="md"
                            size="sm"
                            sx={{ width: 'fit-content' }}
                        />
                    )}

                    <ul className={classes.comments}>
                        {handleSort(comments).map((comment) => {
                            return (
                                <li key={comment._id}>
                                    <Comment
                                        id={comment._id}
                                        author={comment.user}
                                        comment={comment.comment}
                                        createdAt={comment.createdAt}
                                        isLikedState={
                                            user
                                                ? getLikedState(comment._id)
                                                : false
                                        }
                                        likes={
                                            comment.likes ? comment.likes : 0
                                        }
                                        deleteComment={deleteComment}
                                        isPending={isPending}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <Box px="md">
                    {!displayForm && (
                        <Text color="dimmed" mb={30}>
                            No comments have been made yet.
                        </Text>
                    )}
                </Box>
            )}
        </Stack>
    );
};

export default CommentsList;
