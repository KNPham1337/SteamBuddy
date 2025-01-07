import { ChatInputCommandInteraction, Client } from "discord.js";

export default interface Event {
    name: string,
    once: boolean,
    execute: (interaction: Client | ChatInputCommandInteraction) => Promise<void> | void;
};