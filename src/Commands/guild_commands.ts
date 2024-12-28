import {
    ApplicationCommandType, InteractionContextType,
    ApplicationIntegrationType, InteractionResponseType
} from 'discord.js';
import { Command } from './Command.js';
import { response } from 'express';

class TestCommand extends Command{
    type: number;
    integration_types: number[];
    contexts: number[];

    constructor() {
        super('ping', 'Responds with Pong!');
        this.type = ApplicationCommandType.ChatInput;
        this.integration_types = [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall];
        this.contexts = [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel];
    }

    register(): any {
        return {
            name: this.name,
            description: this.description,
            type: this.type,
            integration_types: this.integration_types,
            contexts: this.contexts,
            // options: this.options,
        }
    }

    async execute(interaction: typeof response) {
        return interaction.send({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: `Pong`,
                },
            });
    }
}
export { TestCommand };