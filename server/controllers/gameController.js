const getGames = async (req, res) => {
    const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

    try {
        const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': TWITCH_CLIENT_ID,
                Authorization: `Bearer ${req.accessToken['access_token']}`,
            },
            body: `fields id, cover.image_id, cover.url, genres.name, name, websites.url; where name~"${req.body.name}"*; limit 100;`,
        });
        const games = await response.json();
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getGames };
