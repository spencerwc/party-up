const generateAccessToken = async (req, res, next) => {
    const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

    try {
        const response = await fetch(
            `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
            {
                method: 'POST',
            }
        );
        req.accessToken = await response.json();
        next();
    } catch (error) {
        res.status(400).json({ error: 'Access denied' });
    }
};

module.exports = generateAccessToken;
