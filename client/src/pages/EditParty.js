import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Container, Title } from '@mantine/core';
import EditPartyForm from '../components/EditPartyForm';

const EditParty = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
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
        // If user is not the leader, navigate them back
        if (user.username !== party.leader.username) {
            navigate(-1);
        } else {
            return (
                <Container m="md" p={0}>
                    <Title order={1} size={24}>
                        Edit Party
                    </Title>
                    <EditPartyForm party={party} />
                </Container>
            );
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default EditParty;
