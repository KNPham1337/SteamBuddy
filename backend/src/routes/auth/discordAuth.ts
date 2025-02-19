// TODO: Connect postgresql 

import express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { storeDiscordSession } from '@backend/utils/session.js';
import config from '@backend/config/config.js';

const router = express.Router();
const REDIRECT_URI = `${config.DEV_BACKEND_URL}/auth/discord/callback`;
const STEAM_REDIRECT_URL = `${config.DEV_BACKEND_URL}/auth/steam`;

router.get('/auth/discord/callback', async (req: express.Request, res: express.Response) => {
    try {
        if (!req.query.code) {
            res.status(400).json({ error: "Authorization code missing" });
            return;
        }

        // Set up oauth post request
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

        // Exchange the code from Discord Oauth for authentication token 
        const tokenResponse = await axios.post(url, params, confOptions);

        // Gather discordID
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        });
        const discordProfile = userResponse.data;

        // Store Discord ID in session
        storeDiscordSession(req, discordProfile);

        res.redirect(STEAM_REDIRECT_URL);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching Discord token:", error.response?.data || error.message);
            res.status(500).json({ error: "Failed to authenticate", details: error.response?.data });
        } else {
            console.error("Error fetching Discord token:", error);
        }
    }
});

export default router;