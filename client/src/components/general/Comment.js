import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    Stack,
} from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

const Comment = ({ user, comment, createdAt }) => {
    const { classes } = useStyles();

    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Avatar src={user.avatar_url} alt={user.username} radius="xl" />
                <div>
                    <Text>{user.username}</Text>
                    <Text color="dimmed">{dayjs(createdAt).fromNow()}</Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <Stack>
                    <Text>{comment}</Text>
                </Stack>
            </TypographyStylesProvider>
        </Paper>
    );
};

export default Comment;
