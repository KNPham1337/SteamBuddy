// Separate logic into steam api file
// Separate logic into discord api file

import config from './Tools/config.js';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

// Commands
import { TestCommand } from './Commands/guild_commands.js';

// Set up express app
const app = express();
// Connect to Port
const PORT = config.PORT || 3000;
// Authenticate Steam API Client
// const steam = new SteamAPI(config.STEAM_TOKEN);

/**
 * Interactions endpoint URL for discord
 * 
 * Parse request body and verifies incoming requests using discord-interactions
 */
app.post('/interactions', verifyKeyMiddleware(config.DISCORD_PUBLIC_KEY),
    async function (req, res) {
        // Interaction type, id, and data
        const { type, id, data } = req.body;

        switch (type) {
            /**
            * Handle verification requests
            */
            case InteractionType.PING:
                res.send({ type: InteractionResponseType.PONG });
                break;
            
            /**
            * Handle slash command requests
            */
            case InteractionType.APPLICATION_COMMAND:
                // data is an object but we only want to get the name component
                {
                    const { name } = data;
                    
                    // Check if the command name is valid
                    if (name === 'ping') {
                        new TestCommand().execute(res);
                        break;
                    }

                    console.error(`unknown command: ${name}`);
                    res.status(400).json({ error: 'unknown command' });
                    break;
                }
            
            /**
             * Handle errors
             */
            default:
                console.error('unknown interaction type', type);
                res.status(400).json({ error: 'unkown interaction type' });
                break;
        }
        return;
    }
);

// Handle dynamic listening
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
    console.log('CTRL + C to kill process');
});