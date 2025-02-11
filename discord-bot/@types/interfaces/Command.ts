// import { ChatInputCommandInteraction } from "discord.js";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface Command {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>;
};