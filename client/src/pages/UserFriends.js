import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Title, Anchor, Group, Stack, ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { getErrorNotification } from '../utils/notifications';
import MinimalLoader from '../components/general/MinimalLoader';
import FriendList from '../components/users/FriendList';

const UserFriends = () => {
    const { username } = useParams();
    const { data: userData, error } = useFetch(`/api/users/${username}`);

    useEffect(() => {
        if (error) {
            const notification = getErrorNotification(error);
            showNotification(notification);
        }
    }, [error]);

    if (userData) {
        return (
            <Box mt="md">
                <Group mx="md">
                    <ActionIcon component={Link} to={`/users/${username}`}>
                        <IconChevronLeft />
                    </ActionIcon>
                    <Stack spacing={0}>
                        <Title order={1} size={20}>
                            {username}'s Friends
                        </Title>
                        <Anchor
                            weight={500}
                            component={Link}
                            to={`/users/${username}`}
                        >
                            {username}
                        </Anchor>
                    </Stack>
                </Group>
                <FriendList
                    username={username}
                    friends={userData.friends.sort((a, b) =>
                        a.username.localeCompare(b.username)
                    )}
                />
            </Box>
        );
    }

    return <MinimalLoader />;
};

export default UserFriends;
