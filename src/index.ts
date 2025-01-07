// Separate logic into steam api file
// Separate logic into discord api file

import config from './utils/interfaces/config.js';
import './server'

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
await client.login(config.DISCORD_TOKEN);