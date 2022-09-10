import { Avatar, Text, Paper, Anchor, Stack } from '@mantine/core';
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
                p="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[7]
                            : theme.white,
                    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
                    transition: 'all 0.25s',

                    '&:hover': {
                        boxShadow:
                            'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                        transform: 'translateY(-1px)',
                    },
                })}
            >
                <Stack
                    sx={{
                        width: 90,
                        height: 110,
                        overflow: 'hidden',
                        flexGrow: 1,
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        size={60}
                        radius={120}
                        mx="auto"
                    />
                    <Text align="center" weight={500}>
                        {user.username}
                    </Text>
                </Stack>
            </Paper>
        </Anchor>
    );
};

export default UserCard;
