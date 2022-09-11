import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import {
    Box,
    Title,
    Group,
    Stack,
    Anchor,
    ActionIcon,
    createStyles,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import MinimalLoader from '../components/general/MinimalLoader';
import EditPartyForm from '../components/party/EditPartyForm';

const useStyles = createStyles((theme) => ({
    backButton: {
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[2],
        },
    },
}));

const EditParty = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const { classes } = useStyles();
    const [party, setParty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getParty = async () => {
            const response = await fetch(`/api/parties/${id}`);
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                setParty(json);
            }
        };
        getParty();
    }, [id]);

    if (party) {
        // If user is not the leader, navigate them back
        if (user.username !== party.leader.username) {
            return <Navigate to={`/parties/${party._id}`} />;
        } else {
            return (
                <Box p="md">
                    <Group>
                        <ActionIcon
                            className={classes.backButton}
                            component={Link}
                            to={`/parties/${party._id}`}
                        >
                            <IconChevronLeft />
                        </ActionIcon>
                        <Stack spacing={0}>
                            <Title order={1} size={20}>
                                Edit Party
                            </Title>
                            <Anchor
                                component={Link}
                                to={`/parties/${party._id}`}
                                weight={500}
                            >
                                {party.name}
                            </Anchor>
                        </Stack>
                    </Group>
                    <EditPartyForm party={party} />
                </Box>
            );
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default EditParty;
