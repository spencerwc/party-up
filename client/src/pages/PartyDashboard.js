import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import {
    Stack,
    Title,
    Box,
    Group,
    Select,
    Checkbox,
    Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { getErrorNotification } from '../utils/notifications';
import { IconCalendarOff } from '@tabler/icons';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import PartiesList from '../components/parties/PartiesList';
import MinimalLoader from '../components/general/MinimalLoader';

dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const PartyDashboard = () => {
    const { user } = useAuthContext();
    const { data: userData, error } = useFetch(`/api/users/${user.username}`);
    const [range, setRange] = useState('Today');
    const [showCompleted, setShowCompleted] = useState(false);

    const getPartiesInRange = () => {
        switch (range) {
            case 'Today':
                return userData.parties.filter((party) =>
                    dayjs(party.date).isToday()
                );
            case 'This Week':
                return userData.parties.filter((party) =>
                    dayjs(party.date).isBetween(
                        dayjs().day(0),
                        dayjs().day(6),
                        '[]'
                    )
                );
            case 'This Month':
                return userData.parties.filter(
                    (party) => dayjs(party.date).month() === dayjs().month()
                );
            default:
                return userData.parties;
        }
    };

    const getFilteredParties = () => {
        let filteredParties = getPartiesInRange();

        if (!showCompleted) {
            filteredParties = filteredParties.filter((party) =>
                dayjs(party.date).isSameOrAfter(Date.now())
            );
        }

        return filteredParties.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    };

    useEffect(() => {
        if (error) {
            showNotification(getErrorNotification(error));
        }
    }, [error]);

    if (userData) {
        const filteredParties = getFilteredParties();

        return (
            <Stack mt="md">
                <Title size={20} mx="md">
                    Your Parties
                </Title>
                <Group mx="md" noWrap>
                    <Select
                        value={range}
                        onChange={setRange}
                        data={['Today', 'This Week', 'This Month', 'All Time']}
                        radius="md"
                        size="sm"
                        sx={{
                            maxWidth: 140,
                        }}
                        variant="filled"
                    />
                    <Checkbox
                        label="Show completed"
                        checked={showCompleted}
                        onChange={(event) =>
                            setShowCompleted(event.currentTarget.checked)
                        }
                        size="xs"
                    />
                </Group>
                {filteredParties.length > 0 ? (
                    <Box
                        sx={(theme) => ({
                            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                                paddingLeft: theme.spacing.md,
                                paddingRight: theme.spacing.md,
                            },
                        })}
                    >
                        <PartiesList parties={filteredParties} />
                    </Box>
                ) : (
                    <Group mx="md" spacing="xs" align="start" noWrap>
                        <Text color="dimmed">
                            <IconCalendarOff stroke={1.5} />
                        </Text>
                        <Text color="dimmed">No parties found.</Text>
                    </Group>
                )}
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default PartyDashboard;
