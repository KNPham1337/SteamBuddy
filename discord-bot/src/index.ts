import config from './utils/config.js';

import { Client, GatewayIntentBits } from 'discord.js';
import { join } from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadCommands } from './utils/handlers/commandHandler.js';
import { loadEvents } from './utils/handlers/eventHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
client.commands = await loadCommands(join(__dirname, 'commands'));

// Load events
await loadEvents(join(__dirname, 'events'), client);

// Login
await client.login(config.DISCORD_TOKEN);

console.log('Process event listeners set up.');