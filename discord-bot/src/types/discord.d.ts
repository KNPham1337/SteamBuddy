import { Collection, SlashCommandBuilder } from "discord.js";

declare module "discord.js" {
    interface Command {
        data: SlashCommandBuilder,
        execute: (interaction: CommandInteraction) => Promise<void>;
    }

    interface DiscordEvent {
        name: string,
        once: boolean,
        execute: (interaction: Client | ChatInputCommandInteraction) => Promise<void> | void;
    }

    interface Client {
        commands?: Collection<string, Command>;
    }
}