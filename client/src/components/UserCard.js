import { createStyles, Avatar, Text, Paper, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    userCard: {
        width: '100%',

        [theme.fn.largerThan('xs')]: {
            width: 'auto',
        },
    },
}));

const UserCard = ({ user }) => {
    const { classes } = useStyles();

    return (
        <Anchor
            className={classes.userCard}
            component={Link}
            to={`/users/${user.username}`}
        >
            <Paper
                radius="md"
                withBorder
                p="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.white,
                })}
            >
                <Avatar src={user.avatar} size={100} radius={120} mx="auto" />
                <Text align="center" size="lg" weight={500} mt="md">
                    {user.username}
                </Text>
            </Paper>
        </Anchor>
    );
};

export default UserCard;
