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
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
        }`,
        borderRadius: 0,
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            border: 'none',
            borderRadius: theme.radius.lg,
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        },
    },

    body: {
        paddingLeft: 65,
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
        setLikeCount(likeCount + 1);

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
        <Paper className={classes.comment}>
            <Group>
                <Anchor component={Link} to={`/users/${author.username}`}>
                    <Avatar
                        src={author.avatar_url}
                        alt={author.username}
                        radius="xl"
                        size={50}
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
                    <Text color="dimmed" size="sm">
                        {dayjs(createdAt).fromNow()}
                    </Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <Stack>
                    <Text>{comment}</Text>
                    <Group>
                        <Group spacing={2} sx={{ marginLeft: 'auto' }}>
                            <ActionIcon size="sm" onClick={handleClick}>
                                {isLiked ? (
                                    <IconHeart color="#F06595" fill="#F06595" />
                                ) : (
                                    <IconHeart />
                                )}
                            </ActionIcon>
                            <Text size="sm">{likeCount}</Text>
                        </Group>
                    </Group>
                </Stack>
            </TypographyStylesProvider>
        </Paper>
    );
};

export default Comment;
