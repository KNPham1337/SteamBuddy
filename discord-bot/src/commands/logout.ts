import {
    SlashCommandBuilder, ChatInputCommandInteraction,
} from 'discord.js';

import { Client } from 'discord.js';

const cleanup = async (client: Client<boolean>, exitCode: number) => {
    console.log('Destroying client...');
    await client.destroy();
    console.log(`Exiting with code ${exitCode}`);
    process.exit(exitCode);
};

export default {
    data: new SlashCommandBuilder()
        .setName('logout')
        .setDescription('log SteamBuddy out of discord (for use on local development servers only)'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Logging off!');
        await cleanup(interaction.client, 0);
    },
};