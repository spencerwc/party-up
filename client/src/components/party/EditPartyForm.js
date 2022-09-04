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
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import dayjs from 'dayjs';
import GameSelect from '../../pages/GameSelect';
import GameCard from './GameCard';

const EditPartyForm = ({ party }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [error, setError] = useState(null);
    const [game, setGame] = useState(party.game);
    const [selectingGame, setSelectingGame] = useState(null);

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
                value.length < 2 ? 'Name must have at least 2 letters' : null,

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
        navigate(-1);
    };

    if (selectingGame) {
        return (
            <GameSelect
                name={gameForm.values.gameName}
                setGame={setGame}
                setSelectingGame={setSelectingGame}
            />
        );
    }

    return (
        <>
            {/* This form is used to search for the game. If a game has been selected, render that instead */}

            {!game ? (
                <form
                    aria-label="Search a Game"
                    onSubmit={gameForm.onSubmit(handleGameSearch)}
                >
                    <TextInput
                        mt="md"
                        icon={<IconSearch size={18} stroke={1.5} />}
                        size="md"
                        label="Game"
                        withAsterisk
                        rightSection={
                            <ActionIcon
                                size={32}
                                color={theme.primaryColor}
                                variant="filled"
                                onClick={handleGameSearch}
                            >
                                {theme.dir === 'ltr' ? (
                                    <IconArrowRight size={18} stroke={1.5} />
                                ) : (
                                    <IconArrowLeft size={18} stroke={1.5} />
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
                    label="Party Name"
                    placeholder="My Cool Party"
                    {...partyForm.getInputProps('name')}
                    withAsterisk
                />
                <DatePicker
                    mt="sm"
                    placeholder="Date of the event"
                    label="When to Meet"
                    minDate={new Date(Date.now())}
                    maxDate={dayjs(new Date()).endOf('year').toDate()}
                    {...partyForm.getInputProps('date')}
                    withAsterisk
                />
                <NumberInput
                    mt="sm"
                    label="Looking For"
                    placeholder="# of Members"
                    min={1}
                    max={100}
                    {...partyForm.getInputProps('lookingFor')}
                    withAsterisk
                />
                <Textarea
                    mt="sm"
                    placeholder="Details about your party"
                    label="Party Details"
                    {...partyForm.getInputProps('details')}
                    minRows={4}
                    withAsterisk
                />
                {error && (
                    <Text mt="sm" color="red">
                        {error}
                    </Text>
                )}
                <Group mt="sm" spacing="xs">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Group>
            </form>
        </>
    );
};

export default EditPartyForm;
