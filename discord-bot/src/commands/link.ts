import {
	SlashCommandBuilder, ChatInputCommandInteraction,
	MessageFlags,
} from 'discord.js';
import config from '../utils/config.js';

const REDIRECT_URI = `${config.DEV_BACKEND_URL}/auth/discord/callback`
const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${config.APP_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify+guilds+guilds.members.read`;

export default {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Get a link to connect your Discord and Steam accounts'),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			content: `Click here to link your accounts: [Connect Now](${oauthUrl})`,
			flags: MessageFlags.Ephemeral
		});
	},
};


