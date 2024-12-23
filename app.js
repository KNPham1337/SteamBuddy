// Separate logic into steam api file
// Separate logic into discord api file

import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

// Set up express app
const app = express();
// Connect to Port
const PORT = process.env.PORT || 3000;
// Authenticate Steam API Client
// const steam = new SteamAPI(process.env.STEAM_TOKEN);

/**
 * Interactions endpoint URL for discord
 * 
 * Parse request body and verifies incoming requests using discord-interactions
 */
app.post('/interactions', verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY), async function (req, res) {
    // Interaction type, id, and data
    const { type, id, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    /**
     * Handle slash command requests
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        // data is an object but we only want to get the name component
        const { name } = data;

        // Check if the command name is valid
        if (name === 'test') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Hello World`,
                },
            });
        }

        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });
    }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unkown interaction type' });
});

// Handle dynamic listening
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
    console.log('CTRL + C to kill process');
});