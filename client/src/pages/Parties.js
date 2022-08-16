import { Title } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import PartiesList from '../components/PartiesList';

const Parties = () => {
    const { data: parties, error } = useFetch('/api/parties');

    if (parties) {
        return (
            <>
                <Title order={1} m="md">
                    Parties
                </Title>
                <PartiesList parties={parties} />
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default Parties;
