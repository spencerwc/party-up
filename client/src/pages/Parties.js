import { Title } from '@mantine/core';
import PartiesList from '../components/PartiesList';

const Parties = () => {
    return (
        <>
            <Title order={1} m="md">
                Parties
            </Title>
            <PartiesList parties={[]} />
        </>
    );
};

export default Parties;
