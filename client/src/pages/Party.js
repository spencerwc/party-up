import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import PartyDetails from '../components/PartyDetails';

const Party = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);

    if (party) {
        return (
            <>
                <PartyDetails party={party} />
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default Party;
