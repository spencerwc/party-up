import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useForm } from '@mantine/form';
import {
    useMantineTheme,
    NumberInput,
    TextInput,
    Textarea,
    Button,
    Text,
    ActionIcon,
    Group,
    Paper,
    createStyles,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import dayjs from 'dayjs';
import GameCard from './GameCard';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: theme.spacing.md,
            paddingBottom: theme.spacing.lg,
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        },
    },
}));

const EditPartyForm = ({
    party,
    game,
    setGame,
    setGameName,
    setSelectingGame,
}) => {
    const { user } = useAuthContext();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [error, setError] = useState(null);

    const gameForm = useForm({
        initialValues: {
            gameName: party.game.name,
        },
        validate: {
            gameName: (value) =>
                value.length === 0 ? 'A game must be selected' : null,
        },
    });

    const partyForm = useForm({
        initialValues: {
            name: party.name,
            date: new Date(party.date),
            lookingFor: party.lookingFor,
            details: party.details,
        },

        validate: {
            name: (value) =>
                value.length < 2
                    ? 'Name must have at least 2 letters'
                    : value.length > 100
                    ? 'Name must have fewer than 100 letters'
                    : null,
            date: (value) => (!value ? 'Date must be selected' : null),
            lookingFor: (value) =>
                value < 1 || value > 100
                    ? 'Looking for must be between 1 to 100 members'
                    : null,
            details: (value) =>
                value.length === 0 ? 'Details must be included' : null,
        },
    });

    const handleGameSearch = () => {
        setGameName(gameForm.values.gameName);
        setSelectingGame(true);
    };

    const handleSubmit = async (values) => {
        if (!user) {
            setError('You must be logged in');
            return;
        }

        if (!game) {
            setError('You must select a game');
            return;
        }

        const updatedParty = { ...values, game: { ...game } };

        const response = await fetch(`/api/parties/${party._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedParty),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            navigate(`/parties/${party._id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/parties/${party._id}`);
    };

    return (
        <Paper className={classes.wrapper} radius="lg" mt="md">
            {/* This form is used to search for the game. If a game has been selected, render that instead */}

            {!game ? (
                <form
                    aria-label="Search a Game"
                    onSubmit={gameForm.onSubmit(handleGameSearch)}
                >
                    <TextInput
                        radius="md"
                        icon={<IconSearch size={18} stroke={1.5} />}
                        label="Game"
                        withAsterisk
                        rightSection={
                            <ActionIcon
                                radius="md"
                                color={theme.primaryColor}
                                variant="filled"
                                onClick={handleGameSearch}
                            >
                                {theme.dir === 'ltr' ? (
                                    <IconArrowRight stroke={1.5} />
                                ) : (
                                    <IconArrowLeft stroke={1.5} />
                                )}
                            </ActionIcon>
                        }
                        placeholder="Search games"
                        rightSectionWidth={42}
                        {...gameForm.getInputProps('gameName')}
                    />
                </form>
            ) : (
                <GameCard game={game} setGame={setGame} />
            )}

            {/* This form collects the party details and handles submission */}

            <form
                aria-label="Edit Party"
                onSubmit={partyForm.onSubmit((values) => handleSubmit(values))}
            >
                <TextInput
                    mt="md"
                    radius="md"
                    label="Party Name"
                    placeholder="My Cool Party"
                    {...partyForm.getInputProps('name')}
                    withAsterisk
                />
                <DatePicker
                    mt="sm"
                    radius="md"
                    placeholder="Date of the event"
                    label="When to Meet"
                    minDate={new Date(Date.now())}
                    maxDate={dayjs(new Date()).endOf('year').toDate()}
                    {...partyForm.getInputProps('date')}
                    withAsterisk
                />
                <NumberInput
                    mt="sm"
                    radius="md"
                    label="Looking For"
                    placeholder="# of Members"
                    min={0}
                    max={100}
                    {...partyForm.getInputProps('lookingFor')}
                    withAsterisk
                />
                <Textarea
                    mt="sm"
                    radius="md"
                    placeholder="Details about your party"
                    label="Party Details"
                    {...partyForm.getInputProps('details')}
                    minRows={4}
                    withAsterisk
                />

                {error && (
                    <Text mt="sm" size="sm" color="red">
                        {error}
                    </Text>
                )}

                <Group mt="md" spacing="xs">
                    <Button type="submit" radius="lg">
                        Submit
                    </Button>
                    <Button
                        variant="outline"
                        radius="lg"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};

export default EditPartyForm;
