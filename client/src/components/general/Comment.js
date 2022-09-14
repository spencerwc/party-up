import { useState, forwardRef } from 'react';
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
    Menu,
    Overlay,
    Center,
    Button,
} from '@mantine/core';
import { IconHeart, IconDots, IconTrash, IconEdit } from '@tabler/icons';

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
        position: 'relative',

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

const OptionsButton = forwardRef(({ ...props }, ref) => (
    <ActionIcon ref={ref} {...props} mb="auto">
        <IconDots size={20} />
    </ActionIcon>
));

const Comment = ({
    id,
    author,
    comment,
    createdAt,
    isLikedState,
    likes,
    deleteComment,
    isPending,
}) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(isLikedState);
    const [isConfirming, setIsConfirming] = useState(false);

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

    const handleDelete = () => {
        deleteComment(id);
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
            {isConfirming && (
                <Overlay
                    opacity={1}
                    zIndex={5}
                    radius="lg"
                    p="md"
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[7]
                                : theme.white,
                    })}
                >
                    <Center>
                        <Stack mt="xl">
                            <Text>
                                Are you sure you want to delete this comment?
                            </Text>
                            <Group mx="auto" spacing="xs">
                                <Button
                                    color="red.8"
                                    radius="lg"
                                    onClick={handleDelete}
                                    loading={isPending}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="default"
                                    radius="lg"
                                    onClick={() => setIsConfirming(false)}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                            </Group>
                        </Stack>
                    </Center>
                </Overlay>
            )}
            <Group position="apart">
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
                {user.username === author.username && (
                    <Menu position="bottom-end" radius="md">
                        <Menu.Target>
                            <OptionsButton />
                        </Menu.Target>
                        <Menu.Dropdown
                            sx={(theme) => ({
                                boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
                                backgroundColor:
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[7]
                                        : theme.white,
                            })}
                        >
                            <Menu.Item icon={<IconEdit size={14} />}>
                                Edit
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                icon={<IconTrash size={14} />}
                                onClick={() => setIsConfirming(true)}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
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
