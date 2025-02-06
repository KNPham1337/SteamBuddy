import express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { storeDiscordSession } from '@backend/utils/session.js';
import config from '@backend/config/config.js';

const router = express.Router();
const REDIRECT_URI = `${config.DEV_BACKEND_URL}/auth/discord/callback`;

router.get('/auth/discord/callback', async (req, res) => {
    try {
        if (!req.query.code) {
            res.status(400).json({ error: "Authorization code missing" });
            return;
        }

        console.log("Received:", req.query);

        const { code } = req.query;
        const url = 'https://discord.com/api/oauth2/token';
        const params = new URLSearchParams({
            'code': code as string,
            'client_id': config.DISCORD_CLIENT_ID,
            'client_secret': config.DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'scope': 'identify guilds guilds.members.read',
        });
        const confOptions: AxiosRequestConfig<URLSearchParams> = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

        console.log(params.toString());
        console.log(confOptions);

        // Exchange the code from Discord Oauth for 
        const tokenResponse = await axios.post(url, params, confOptions);

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        });

        const discordId = userResponse.data.id;
        console.log(discordId)

        // Store Discord ID in session
        storeDiscordSession(req, discordId);
        console.log(req.session.discordId);

        // Redirect to Steam OpenID
        const steamRedirectUrl = `${config.DEV_BACKEND_URL}/auth/steam`;

        res.redirect(steamRedirectUrl);
    } catch (error) {
        console.error("Error fetching Discord token:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to authenticate", details: error.response?.data });
        // console.error('Discord OAuth Error:', error);
        // res.status(500).send('Error authenticating with Discord');
    }
});

export default router;