import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import {
    Container,
    Title,
    Anchor,
    Group,
    Stack,
    ActionIcon,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import MinimalLoader from '../components/general/MinimalLoader';
import UserList from '../components/users/UserList';

const PartyMembers = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);

    if (party) {
        return (
            <Container m="md" p={0}>
                <Group>
                    <ActionIcon component={Link} to={`/parties/${party._id}`}>
                        <IconChevronLeft />
                    </ActionIcon>
                    <Stack spacing={0}>
                        <Title order={1} size={21}>
                            Members
                        </Title>
                        <Anchor component={Link} to={`/parties/${party._id}`}>
                            {party.name}
                        </Anchor>
                    </Stack>
                </Group>
                <UserList leader={party.leader} users={party.members} />
            </Container>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default PartyMembers;
