import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditParty = () => {
    const { id } = useParams();
    const [party, setParty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getParty = async () => {
            const response = await fetch(`/api/parties/${id}`);
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                setParty(json);
            }
        };

        getParty();
    }, [id]);

    if (party) {
        return <div>{party.name}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default EditParty;
