import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Box, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';

const User = ({ setIsRegistering }) => {
    const { username } = useParams();

    const { data: userData, error } = useFetch(`/api/users/${username}`);

    if (userData) {
        return (
            <Box p="md">
                <UserDetails user={userData} />
            </Box>
        );
    }

    if (error) {
        return <Text m="md">{error}</Text>;
    }

    return <MinimalLoader />;
};

export default User;
