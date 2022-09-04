import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import MinimalLoader from '../components/general/MinimalLoader';

const PartyMembers = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);

    if (party) {
        return <div>Members</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default PartyMembers;
