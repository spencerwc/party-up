import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Title, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';

const User = ({ setIsRegistering }) => {
    const { username } = useParams();

    const { data: user, error } = useFetch(`/api/users/${username}`);

    if (user) {
        console.log(user);
        return <Title order={1}>{user.username}</Title>;
    }

    if (error) {
        return <Text m="md">{error}</Text>;
    }

    return <MinimalLoader />;
};

export default User;
