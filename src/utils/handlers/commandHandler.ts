import { Collection } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import Command from "../interfaces/Command.js";

export const loadCommands = async (commandsPath: string) => {
    const commands = new Collection<string, Command>();
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));


    for (const file of commandFiles) {
        // import join module dynamically for realtime excution on filepaths
        const absPath = pathToFileURL(join(commandsPath, file)).href

        const command = (await import(absPath)).default

        if (command && command.data && command.execute) {
            commands.set(command.data.name, command);
        } else {
            console.warn(`[Warning] The command at ${file} is missing "data" or "execute".`);
        }
    }
    
    return commands;
}