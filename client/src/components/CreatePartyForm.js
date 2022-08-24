import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from '@mantine/form';
import {
    useMantineTheme,
    NumberInput,
    TextInput,
    Textarea,
    Button,
    Text,
    ActionIcon,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import GameSelect from './GameSelect';

const CreatePartyForm = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [error, setError] = useState(null);
    const [game, setGame] = useState(null);
    const [selectingGame, setSelectingGame] = useState(null);

    const gameForm = useForm({
        initialValues: {
            gameName: '',
        },
        validate: {
            gameName: (value) =>
                value.length === 0 ? 'A game must be selected' : null,
        },
    });

    const partyForm = useForm({
        initialValues: {
            name: '',
            date: new Date(Date.now()),
            lookingFor: 1,
            details: '',
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

        const response = await fetch('/api/parties', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            setError(null);
            navigate(`/parties/${json._id}`);
        }
    };

    if (selectingGame) {
        return (
            <GameSelect
                name={gameForm.values.gameName}
                game={game}
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
                <div>Game Info Here</div>
            )}

            {/* This form collects the party details and handles submission */}

            <form
                aria-label="Start a Party"
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
                <Button type="submit" mt="sm">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default CreatePartyForm;
