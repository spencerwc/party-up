import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Title } from '@mantine/core';
import EditPartyForm from '../components/EditPartyForm';

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
        return (
            <Container m="md" p={0}>
                <Title order={1} size={24}>
                    Edit Party
                </Title>
                <EditPartyForm party={party} />
            </Container>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default EditParty;
