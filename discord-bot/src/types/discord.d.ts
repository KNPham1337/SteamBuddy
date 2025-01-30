import { Collection, SlashCommandBuilder } from "discord.js";
// import Command from "./interfaces/Command.ts";

declare module "discord.js" {
    interface Command {
        data: SlashCommandBuilder,
        execute: (interaction: CommandInteraction) => Promise<void>;
    }

    interface Event {
        name: string,
        once: boolean,
        execute: (interaction: Client | ChatInputCommandInteraction) => Promise<void> | void;
    }

    interface Client {
        commands: Collection<string, Command>;
    }
}