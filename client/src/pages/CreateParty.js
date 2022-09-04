import { Container, Title } from '@mantine/core';
import CreatePartyForm from '../components/party/CreatePartyForm';

const CreateParty = () => {
    return (
        <Container m="md" p={0}>
            <Title order={1} size={24}>
                Start a Party
            </Title>
            <CreatePartyForm />
        </Container>
    );
};

export default CreateParty;
