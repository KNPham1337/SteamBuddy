import 'dotenv/config';
import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType } from 'discord.js';
import { InstallGuildCommands } from './utils.js';

const TEST_COMMAND = {
    name: 'test',
    description: 'Test connection',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
    contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
};

const ALL_COMMANDS = [TEST_COMMAND];

InstallGuildCommands(process.env.APP_ID, process.env.TEST_GUILD, ALL_COMMANDS);