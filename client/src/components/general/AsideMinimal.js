import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
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
    const navigate = useNavigate();
    const [newParties, setNewParties] = useState(null);

    const handleStartPartyClick = () => {
        if (!user) {
            setIsRegistering(true);
        } else {
            navigate('/parties/new');
        }
    };

    useEffect(() => {
        const getParties = async () => {
            const response = await fetch('/api/parties');
            const json = await response.json();

            if (response.ok) {
                const parties = json.slice(0, 3);
                setNewParties(parties);
            }
        };

        getParties();
    }, []);

    return (
        <MediaQuery className={classes.aside}>
            <Aside py="md" pr="md" hiddenBreakpoint="sm">
                <Stack>
                    <Button onClick={handleStartPartyClick} radius="lg">
                        Start a Party
                    </Button>

                    {newParties && (
                        <Box>
                            <Group mb="sm" position="apart">
                                <Text weight={700}>New Parties</Text>
                                <Anchor
                                    component={Link}
                                    to="/parties"
                                    weight={500}
                                    size="sm"
                                >
                                    See All
                                </Anchor>
                            </Group>
                            <PartiesList parties={newParties} />
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
