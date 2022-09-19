import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Group, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';
import UserActions from '../components/user/UserActions';
import UserCardList from '../components/users/UserCardList';

const User = ({ setIsRegistering }) => {
    const { username } = useParams();
    const { user } = useAuthContext();
    const { data: userData, error } = useFetch(`/api/users/${username}`);

    if (userData) {
        return (
            <Stack>
                <Group spacing="xs" noWrap position="apart" align="flex-start">
                    <UserDetails user={userData} />
                    <UserActions userData={userData} />
                </Group>

                {userData.friends.length > 0 && (
                    <UserCardList
                        title="Friends"
                        seeAllLink="friends"
                        users={userData.friends}
                    />
                )}
            </Stack>
        );
    }

    if (error) {
        return (
            <Text m="md" color="dimmed">
                {error}
            </Text>
        );
    }

    return <MinimalLoader />;
};

export default User;
