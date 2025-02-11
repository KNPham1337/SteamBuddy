import {
    SlashCommandBuilder, ChatInputCommandInteraction,
    MessageFlags,
 } from 'discord.js';
import { APP_ID, REDIRECT_URI } from '../../utils/config.js';

const oauthUrl: string = `https://discord.com/oauth2/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=https%3A%2F%2F${REDIRECT_URI}%2F&scope=identify+connections`;

    // `https://discord.com/oauth2/authorize?client_id=${APP_ID}&permissions=2048&response_type=code&redirect_uri=https%3A%2F%2F${REDIRECT_URI}%2F&integration_type=0&scope=identify+connections+bot`;

export default {
	data: new SlashCommandBuilder()
		.setName('connect')
		.setDescription('allow the steambuddy to access steam on discord connections'),
    async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({ content: oauthUrl, flags: MessageFlags.Ephemeral });
	},
};