import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Title, Anchor, Group, Stack, ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { getErrorNotification } from '../utils/notifications';
import MinimalLoader from '../components/general/MinimalLoader';
import UserList from '../components/users/UserList';
import FilterForm from '../components/general/FilterForm';

const PartyMembers = () => {
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        if (party) {
            setFilteredMembers(
                party.members.sort((a, b) =>
                    a.username.localeCompare(b.username)
                )
            );
        }
    }, [party]);

    useEffect(() => {
        if (error) {
            const notification = getErrorNotification(error);
            showNotification(notification);
        }
    }, [error]);

    const filterMembers = (term) => {
        setFilteredMembers(
            party.members.filter((member) => member.username.includes(term))
        );
    };

    if (party) {
        return (
            <Box mt="md">
                <Group mx="md">
                    <ActionIcon component={Link} to={`/parties/${party._id}`}>
                        <IconChevronLeft />
                    </ActionIcon>
                    <Stack spacing={0}>
                        <Title order={1} size={20}>
                            Members
                        </Title>
                        <Anchor
                            weight={500}
                            component={Link}
                            to={`/parties/${party._id}`}
                        >
                            {party.name}
                        </Anchor>
                    </Stack>
                </Group>

                <Box mx="md">
                    <FilterForm
                        placeholder="Search members"
                        filter={filterMembers}
                    />
                </Box>

                <UserList
                    variant="party"
                    leader={party.leader}
                    users={filteredMembers}
                />
            </Box>
        );
    }

    return <MinimalLoader />;
};

export default PartyMembers;
