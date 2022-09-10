import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    createStyles,
    Text,
    Avatar,
    Anchor,
    Group,
    TypographyStylesProvider,
    Paper,
    Stack,
    ActionIcon,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons';

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
    },
}));

const Comment = ({ id, author, comment, createdAt, isLikedState, likes }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(isLikedState);

    const likeComment = () => {
        setIsLiked(true);
        setLikeCount(likes + 1);

        fetch(`/api/comments/${id}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
    };

    const unlikeComment = async () => {
        setIsLiked(false);

        if (likeCount - 1 < 0) {
            setLikeCount(0);
        } else {
            setLikeCount(likeCount - 1);
        }

        fetch(`/api/comments/${id}/unlike`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
    };

    const handleClick = async () => {
        if (!user) {
            alert('Please log in');
        } else if (!isLiked) {
            likeComment();
        } else {
            unlikeComment();
        }
    };

    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Anchor component={Link} to={`/users/${author.username}`}>
                    <Avatar
                        src={author.avatar_url}
                        alt={author.username}
                        radius="xl"
                    />
                </Anchor>
                <div>
                    <Anchor
                        component={Link}
                        to={`/users/${author.username}`}
                        variant="text"
                    >
                        <Text weight={500}>{author.username}</Text>
                    </Anchor>
                    <Text color="dimmed">{dayjs(createdAt).fromNow()}</Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <Stack>
                    <Text>{comment}</Text>
                    <Group>
                        <Group spacing={2} sx={{ marginLeft: 'auto' }}>
                            <ActionIcon size="sm" onClick={handleClick}>
                                {isLiked ? (
                                    <IconHeart color="red" fill="red" />
                                ) : (
                                    <IconHeart />
                                )}
                            </ActionIcon>
                            <Text color="dimmed">{likeCount}</Text>
                        </Group>
                    </Group>
                </Stack>
            </TypographyStylesProvider>
        </Paper>
    );
};

export default Comment;
