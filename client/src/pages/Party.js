import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import PartyDetails from '../components/PartyDetails';
import UserCardList from '../components/UserCardList';

const Party = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);

    if (party) {
        return (
            <>
                <PartyDetails party={party} />
                <UserCardList
                    title="Members"
                    seeAllLink={`members`}
                    users={party.members}
                />
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default Party;
