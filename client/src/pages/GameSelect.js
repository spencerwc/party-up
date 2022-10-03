import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import {
    Box,
    Group,
    Stack,
    Anchor,
    Title,
    ActionIcon,
    createStyles,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { getErrorNotification } from '../utils/notifications';
import MinimalLoader from '../components/general/MinimalLoader';
import GameTable from '../components/party/GameTable';

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

const GameSelect = ({ name, setGame, setSelectingGame, breadcrumb }) => {
    const { user } = useAuthContext();
    const { classes } = useStyles();
    const [games, setGames] = useState(null);

    const handleClose = () => {
        setSelectingGame(false);
    };

    const handleSelect = (game) => {
        setGame(game);
        handleClose();
    };

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(`/api/games`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const json = await response.json();

            if (!response.ok) {
                const notification = getErrorNotification(json.error);
                showNotification(notification);
            }

            if (response.ok) {
                setGames(json);
            }
        };

        if (user) {
            fetchGames();
        }
    }, [user, name]);

    if (games) {
        return (
            <Box pt="md">
                <Group ml="md">
                    <ActionIcon
                        className={classes.backButton}
                        onClick={() => setSelectingGame(false)}
                    >
                        <IconChevronLeft />
                    </ActionIcon>
                    <Stack spacing={0}>
                        <Title order={1} size={20}>
                            Select a Game
                        </Title>
                        <Anchor
                            weight={500}
                            onClick={() => setSelectingGame(false)}
                        >
                            {breadcrumb}
                        </Anchor>
                    </Stack>
                </Group>

                <GameTable games={games} handleSelect={handleSelect} />
            </Box>
        );
    }

    return <MinimalLoader />;
};

export default GameSelect;
