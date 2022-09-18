import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';
import UserCardList from '../components/users/UserCardList';

const User = ({ setIsRegistering }) => {
    const { username } = useParams();

    const { data: userData, error } = useFetch(`/api/users/${username}`);

    if (userData) {
        return (
            <Stack>
                <UserDetails user={userData} />
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
