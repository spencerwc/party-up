import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Title, Anchor, Group, Stack, ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import MinimalLoader from '../components/general/MinimalLoader';
import FriendList from '../components/users/FriendList';

const UserFriends = () => {
    const { username } = useParams();
    const { data: userData, error } = useFetch(`/api/users/${username}`);

    if (userData) {
        return (
            <Box mt="md" mb={68}>
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
                <FriendList username={username} friends={userData.friends} />
            </Box>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default UserFriends;
