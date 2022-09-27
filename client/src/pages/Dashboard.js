import { useAuthContext } from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { Anchor, Box, Group, Stack, Title, Text } from '@mantine/core';
import { IconCalendarOff } from '@tabler/icons';
import MinimalLoader from '../components/general/MinimalLoader';
import PartiesList from '../components/parties/PartiesList';
import dayjs from 'dayjs';

const Dashboard = () => {
    const { user } = useAuthContext();
    const { data: userData, error } = useFetch(`/api/users/${user.username}`);

    const getPartiesInRange = (range, parties) => {
        switch (range) {
            case 'today':
                return parties.filter((party) => dayjs(party.date).isToday());
            case 'week':
                return parties.filter((party) =>
                    dayjs(party.date).isBetween(
                        dayjs().day(0),
                        dayjs().day(6),
                        '[]'
                    )
                );
            default:
                return parties;
        }
    };

    if (userData) {
        const partiesToday = getPartiesInRange('today', userData.parties);
        const partiesWeek = getPartiesInRange('week', userData.parties);

        return (
            <Stack pt="md" spacing="lg">
                <Title size={20} mx="md">
                    Hey {user.username}! 👋
                </Title>
                <Stack>
                    <Group position="apart" mx="md">
                        <Title order={2} size={17} weight={500}>
                            Your Upcoming Parties
                        </Title>
                        <Anchor component={Link} to="/me/parties" weight={500}>
                            See All
                        </Anchor>
                    </Group>

                    <Stack>
                        <Text mx="md" weight={500}>
                            Today
                        </Text>
                        {partiesToday.length > 0 ? (
                            <Box
                                sx={(theme) => ({
                                    [`@media (min-width: ${theme.breakpoints.md}px)`]:
                                        {
                                            paddingLeft: theme.spacing.md,
                                            paddingRight: theme.spacing.md,
                                        },
                                })}
                            >
                                <PartiesList parties={partiesToday} />
                            </Box>
                        ) : (
                            <Group mx="md" spacing="xs" align="start" noWrap>
                                <Text color="dimmed">
                                    <IconCalendarOff stroke={1.5} />
                                </Text>
                                <Text color="dimmed">
                                    No parties found for{' '}
                                    {dayjs().format('dddd, MMMM D, YYYY')}.
                                </Text>
                            </Group>
                        )}
                    </Stack>

                    <Stack>
                        <Text mx="md" weight={500}>
                            Later This Week
                        </Text>
                        {partiesWeek.length ? (
                            <Box
                                sx={(theme) => ({
                                    [`@media (min-width: ${theme.breakpoints.md}px)`]:
                                        {
                                            paddingLeft: theme.spacing.md,
                                            paddingRight: theme.spacing.md,
                                        },
                                })}
                            >
                                <PartiesList parties={partiesWeek} />
                            </Box>
                        ) : (
                            <Group mx="md" spacing="xs" align="start" noWrap>
                                <Text color="dimmed">
                                    <IconCalendarOff stroke={1.5} />
                                </Text>
                                <Text color="dimmed">
                                    No parties found before{' '}
                                    {dayjs()
                                        .day(6)
                                        .add(1, 'day')
                                        .format('dddd, MMMM D, YYYY')}
                                    .
                                </Text>
                            </Group>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default Dashboard;
