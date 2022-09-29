import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Title, Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { getErrorNotification } from '../utils/notifications';
import PartiesList from '../components/parties/PartiesList';
import MinimalLoader from '../components/general/MinimalLoader';
import { useEffect } from 'react';

const PartyDashboard = () => {
    const { user } = useAuthContext();
    const { data: userData, error } = useFetch(`/api/users/${user.username}`);

    useEffect(() => {
        if (error) {
            showNotification(getErrorNotification(error));
        }
    }, [error]);

    if (userData) {
        return (
            <Stack mt="md">
                <Title size={20} mx="md">
                    Your Parties
                </Title>
                <Box
                    sx={(theme) => ({
                        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                            paddingLeft: theme.spacing.md,
                            paddingRight: theme.spacing.md,
                        },
                    })}
                >
                    <PartiesList parties={userData.parties} />
                </Box>
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default PartyDashboard;
