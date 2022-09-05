import { Avatar, Text, Paper, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    return (
        <Anchor
            component={Link}
            to={`/users/${user.username}`}
            underline={false}
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
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[0]
                                : theme.colors.gray[0],
                    },
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
