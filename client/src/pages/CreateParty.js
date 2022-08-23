import { Container, Title } from '@mantine/core';
import CreatePartyForm from '../components/CreatePartyForm';

const CreateParty = () => {
    return (
        <Container m="md" p={0}>
            <Title>Start a Party</Title>
            <CreatePartyForm />
        </Container>
    );
};

export default CreateParty;
