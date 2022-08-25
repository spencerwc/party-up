import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import GameTable from '../components/GameTable';

const GameSelect = ({ name, setGame, setSelectingGame }) => {
    const { user } = useAuthContext();
    const [games, setGames] = useState(null);
    const [error, setError] = useState(null);

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
                setError(json.error);
            }

            if (response.ok) {
                setError(null);
                setGames(json);
            }
        };

        if (user) {
            fetchGames();
        }
    }, [user, name]);

    if (games) {
        return (
            <>
                <Button
                    mt="md"
                    variant="light"
                    leftIcon={<IconArrowLeft size={20} stroke={1.5} />}
                    onClick={handleClose}
                >
                    Back
                </Button>
                <GameTable games={games} handleSelect={handleSelect} />
            </>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default GameSelect;
