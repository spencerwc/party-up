import { Link } from 'react-router-dom';
import { Avatar, Anchor, Group, Stack, Title, Text } from '@mantine/core';
import { IconCalendar, IconUsers } from '@tabler/icons';
import dayjs from 'dayjs';

const UserDetails = ({ user, friends }) => {
    return (
        <Stack spacing="xs" px="md" pt="md">
            <Avatar src={user.avatar} radius={120} size={90} />

            <Stack spacing={5} mr="auto">
                <Title order={1} size={24}>
                    {user.username}
                </Title>

                {user.bio && <Text size="sm">{user.bio}</Text>}

                <Group spacing={8}>
                    <Group spacing={5} align="flex-start">
                        <Text color="dimmed">
                            <IconUsers size={15} />
                        </Text>
                        <Anchor
                            component={Link}
                            to={`friends`}
                            size="sm"
                            color="dimmed"
                        >
                            {friends.length} friend
                            {friends.length !== 1 && 's'}
                        </Anchor>
                    </Group>

                    <Group spacing={5} align="flex-start">
                        <Text color="dimmed">
                            <IconCalendar size={15} />
                        </Text>
                        <Text size="sm" color="dimmed">
                            Joined {dayjs(user.createdAt).format('MMMM YYYY')}
                        </Text>
                    </Group>
                </Group>
            </Stack>
        </Stack>
    );
};

export default UserDetails;
