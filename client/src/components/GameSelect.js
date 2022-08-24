import { useState, useEffect } from 'react';

const GameSelect = ({ name }) => {
    const [games, setGames] = useState(null);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(`/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const json = await response.json();

            if (!response.ok) {
                console.error(response.statusText);
            }

            if (response.ok) {
                setGames(json);
            }
        };

        fetchGames();
    }, [name]);

    return <div>{games ? <p>Games</p> : <p>No games</p>}</div>;
};

export default GameSelect;
