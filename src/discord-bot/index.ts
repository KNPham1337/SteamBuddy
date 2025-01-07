// Separate logic into steam api file
// Separate logic into discord api file

import { DISCORD_TOKEN } from './utils/config.js';

import { Client, GatewayIntentBits} from 'discord.js';
import { loadCommands } from './utils/handlers/commandHandler.js';
import { loadEvents } from './utils/handlers/eventHandler.js';
import { join } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
client.commands = await loadCommands(join(__dirname, 'commands'));
    
// Load events
await loadEvents(join(__dirname, 'events'), client);

// Login
await client.login(DISCORD_TOKEN);