import { useEffect, useState } from 'react';
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
import FilterForm from '../components/general/FilterForm';

const PartyMembers = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        if (party) {
            setFilteredMembers(party.members);
        }
    }, [party]);

    const filterMembers = (term) => {
        setFilteredMembers(
            party.members.filter((member) => member.username.includes(term))
        );
    };

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
                <FilterForm
                    placeholder="Search members"
                    filter={filterMembers}
                />
                <UserList leader={party.leader} users={filteredMembers} />
            </Container>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default PartyMembers;
