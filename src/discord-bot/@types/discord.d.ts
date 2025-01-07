import { Collection } from "discord.js";
import Command from "./interfaces/Command.ts";

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
    }
}