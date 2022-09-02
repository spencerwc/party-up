import { Title } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import MinimalLoader from '../components/MinimalLoader';
import PartiesList from '../components/PartiesList';

const Parties = () => {
    const { data: parties, error } = useFetch('/api/parties');

    if (parties) {
        return (
            <>
                <Title order={1} size={24} m="md">
                    Parties
                </Title>
                <PartiesList parties={parties} />
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default Parties;
