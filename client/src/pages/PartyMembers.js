import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import MinimalLoader from '../components/general/MinimalLoader';
import UserList from '../components/users/UserList';

const PartyMembers = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);

    if (party) {
        return <UserList leader={party.leader} users={party.members} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default PartyMembers;
