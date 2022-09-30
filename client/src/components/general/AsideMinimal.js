import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import {
    MediaQuery,
    Aside,
    Button,
    Paper,
    Center,
    Stack,
    Box,
    Group,
    Text,
    createStyles,
    Anchor,
    TextInput,
    ActionIcon,
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons';
import ColorSchemeToggle from '../general/ColorSchemeToggle';
import PartiesList from '../parties/PartiesList';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useState } from 'react';

dayjs.extend(isBetween);

const useStyles = createStyles((theme) => ({
    aside: {
        display: 'none',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: 675,
            position: 'sticky',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: 'transparent',
            border: 'none',
        },
    },
}));

const AsideMinimal = ({ setIsRegistering }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const { data: parties } = useFetch('/api/parties');
    const [upcomingParties, setUpcomingParties] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const PARTY_LIMIT = 3;

    const handleStartPartyClick = () => {
        if (!user) {
            setIsRegistering(true);
        } else {
            navigate('/parties/new');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/parties?q=${searchTerm}`);
    };

    useEffect(() => {
        if (parties) {
            setUpcomingParties(
                parties.filter((party) =>
                    dayjs(party.date).isBetween(
                        dayjs(),
                        dayjs().add(7, 'days'),
                        '[]'
                    )
                )
            );
        }
    }, [parties]);

    return (
        <MediaQuery className={classes.aside}>
            <Aside py="md" pr="md" hiddenBreakpoint="sm">
                <Stack>
                    <Button onClick={handleStartPartyClick} radius="lg">
                        Start a Party
                    </Button>

                    <form onSubmit={handleSearch}>
                        <TextInput
                            icon={<IconSearch size={18} stroke={1.5} />}
                            radius="md"
                            variant="filled"
                            rightSection={
                                <ActionIcon size={32} radius="md">
                                    <IconArrowRight size={18} stroke={1.5} />
                                </ActionIcon>
                            }
                            placeholder="Search parties"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>

                    {upcomingParties && upcomingParties.length > 0 && (
                        <Box>
                            <Group mb="sm" position="apart">
                                <Text weight={700}>Upcoming Parties</Text>
                                <Anchor
                                    component={Link}
                                    to="/parties"
                                    weight={500}
                                    size="sm"
                                >
                                    See All
                                </Anchor>
                            </Group>
                            <PartiesList
                                parties={upcomingParties.slice(0, PARTY_LIMIT)}
                            />
                        </Box>
                    )}

                    <Paper
                        p="md"
                        radius="lg"
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
                        }}
                    >
                        <Center>
                            <ColorSchemeToggle />
                        </Center>
                    </Paper>
                </Stack>
            </Aside>
        </MediaQuery>
    );
};

export default AsideMinimal;
