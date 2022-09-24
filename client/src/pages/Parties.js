import { Box, Title, Group, Select, Checkbox, MediaQuery } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import MinimalLoader from '../components/general/MinimalLoader';
import PartiesList from '../components/parties/PartiesList';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useState } from 'react';

dayjs.extend(isToday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const Parties = () => {
    const { data: parties, error } = useFetch('/api/parties');
    const [range, setRange] = useState('Today');
    const [hideFilled, setHideFilled] = useState(false);
    const [hidePast, setHidePast] = useState(false);

    const getPartiesInRange = () => {
        switch (range) {
            case 'Today':
                return parties.filter((party) => dayjs(party.date).isToday());
            case 'This Week':
                return parties.filter((party) =>
                    dayjs(party.date).isBetween(
                        dayjs().subtract(1, 'day'),
                        dayjs().day(6),
                        '(]'
                    )
                );
            case 'This Month':
                return parties.filter(
                    (party) =>
                        dayjs(party.date).isSameOrAfter(dayjs(), 'day') &&
                        dayjs(party.date).month() === dayjs().month()
                );
            default:
                return parties;
        }
    };

    const getFilteredParties = () => {
        let filteredParties = getPartiesInRange(parties);

        if (hideFilled) {
            filteredParties = filteredParties.filter(
                (party) => party.members.length - 1 !== party.lookingFor
            );
        }

        if (hidePast) {
            filteredParties = filteredParties.filter((party) =>
                dayjs(party.date).isSameOrAfter(dayjs(), 'day')
            );
        }

        return filteredParties;
    };

    if (parties) {
        const filtered = getFilteredParties();

        return (
            <Box
                sx={(theme) => ({
                    paddingTop: theme.spacing.md,
                    paddingBottom: 68,

                    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                        padding: theme.spacing.md,
                    },
                })}
            >
                <Title
                    order={1}
                    size={20}
                    mb="sm"
                    sx={(theme) => ({
                        marginLeft: theme.spacing.md,

                        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                            marginLeft: 0,
                        },
                    })}
                >
                    Parties
                </Title>

                <Group
                    mb="md"
                    sx={(theme) => ({
                        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                            marginLeft: theme.spacing.md,
                            marginRight: theme.spacing.md,
                        },
                    })}
                    noWrap
                >
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
                        label="Hide filled"
                        checked={hideFilled}
                        onChange={(event) =>
                            setHideFilled(event.currentTarget.checked)
                        }
                        size="xs"
                    />
                    <Checkbox
                        label="Hide past"
                        checked={hidePast}
                        onChange={(event) =>
                            setHidePast(event.currentTarget.checked)
                        }
                        size="xs"
                    />
                </Group>

                <PartiesList parties={filtered} />
            </Box>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default Parties;
