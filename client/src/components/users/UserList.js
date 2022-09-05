import { Link } from 'react-router-dom';
import { Group, Stack, Avatar, Anchor, Text } from '@mantine/core';
import { IconCrown } from '@tabler/icons';

const UserList = ({ leader, users }) => {
    return (
        <Stack mt="lg" spacing="md">
            {users.map((user) => (
                <Anchor
                    key={user.username}
                    component={Link}
                    to={`/users/${user.username}`}
                    underline={false}
                    variant="text"
                >
                    <Group key={user.username}>
                        <Avatar src={user.avatar} size={70} radius={120} />
                        <div>
                            <Text size="lg" weight={500}>
                                {user.username}
                            </Text>
                            <Text color="dimmed">
                                {user.username === leader.username ? (
                                    <Group spacing={5}>
                                        <IconCrown /> Leader
                                    </Group>
                                ) : (
                                    'Member'
                                )}
                            </Text>
                        </div>
                    </Group>
                </Anchor>
            ))}
        </Stack>
    );
};

export default UserList;
