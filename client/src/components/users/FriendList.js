import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import {
    Group,
    Stack,
    Avatar,
    Anchor,
    Text,
    Center,
    createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            borderRadius: theme.radius.lg,
            marginRight: theme.spacing.md,
            marginLeft: theme.spacing.md,
        },
    },

    user: {
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
        }`,

        '&:first-of-type': {
            borderTop: '0px',
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            transition: 'all 0.25s',

            '&:hover': {
                boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',

                '&:last-child': {
                    boxShadow: 'none',
                },
            },
        },
    },

    leader: {
        color: theme.colors.yellow[6],
        fill: theme.colors.yellow[6],
    },
}));

const FriendList = ({ username, friends }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();

    return (
        <Stack className={classes.wrapper} mt="lg" spacing={0}>
            {friends.length > 0 ? (
                friends.map((user) => (
                    <Anchor
                        className={classes.user}
                        key={user.username}
                        component={Link}
                        to={`/users/${user.username}`}
                        underline={false}
                        variant="text"
                        p="sm"
                    >
                        <Group>
                            <Avatar src={user.avatar} size={60} radius={120} />
                            <Text weight={500}>{user.username}</Text>
                        </Group>
                    </Anchor>
                ))
            ) : (
                <Center p="md">
                    <Text color="dimmed">
                        {username === user.username
                            ? "You haven't added any friends yet."
                            : `${username} hasn't added any friends yet.`}
                    </Text>
                </Center>
            )}
        </Stack>
    );
};

export default FriendList;
