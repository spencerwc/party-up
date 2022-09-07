import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    createStyles,
    Text,
    Avatar,
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

const Comment = ({ author, comment, createdAt, likes }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkLikedStatus = async () => {
            //    Check if user has liked the comment
            setLiked(true);
        };

        if (user) {
            checkLikedStatus();
        }
    }, [user]);

    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Avatar
                    src={author.avatar_url}
                    alt={author.username}
                    radius="xl"
                />
                <div>
                    <Text>{author.username}</Text>
                    <Text color="dimmed">{dayjs(createdAt).fromNow()}</Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <Stack>
                    <Text>{comment}</Text>
                    <Group>
                        <Group spacing={2} sx={{ marginLeft: 'auto' }}>
                            <ActionIcon size="sm">
                                {liked ? (
                                    <IconHeart color="red" fill="red" />
                                ) : (
                                    <IconHeart />
                                )}
                            </ActionIcon>
                            <Text color="dimmed">{likes}</Text>
                        </Group>
                    </Group>
                </Stack>
            </TypographyStylesProvider>
        </Paper>
    );
};

export default Comment;
