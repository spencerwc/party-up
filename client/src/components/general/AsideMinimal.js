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
} from '@mantine/core';
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
    const navigate = useNavigate();
    const PARTY_LIMIT = 3;

    const handleStartPartyClick = () => {
        if (!user) {
            setIsRegistering(true);
        } else {
            navigate('/parties/new');
        }
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
