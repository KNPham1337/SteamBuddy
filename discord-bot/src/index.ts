// Separate logic into steam api file
// Separate logic into discord api file

import config from './utils/config.js';

import { Client, GatewayIntentBits } from 'discord.js';
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
let isLoggedIn = false;

if (!isLoggedIn) {
    await client.login(config.DISCORD_TOKEN);
    isLoggedIn = true;
}

const cleanup = async (exitCode: number) => {
    console.log('Destroying client...');
    await client.destroy();
    console.log(`Exiting with code ${exitCode}`);
    process.exit(exitCode);
};

process.on('SIGINT', async () => {
    console.log('SIGINT signal received.');
    cleanup(0);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    cleanup(0);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    cleanup(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    cleanup(1);
});

console.log('Process event listeners set up.');