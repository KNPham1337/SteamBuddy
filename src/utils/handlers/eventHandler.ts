import { Client } from 'discord.js';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { pathToFileURL } from 'node:url';
/**
     * This set of code will dynamically import and process event files and handles the registration of event listeners
     * 
     * As each file is being imported and processed, the processed event will activate it's respective listener.
     * Once all event files have been imported + processed + listener activated all promises have been completed
     * 
     * Or if one fails due to an error, we do not pass.
     */
export const loadEvents = async (eventsPath: string, client: Client) => {
    const eventFiles = await readdir(eventsPath);

    await Promise.all(
        eventFiles
            .filter(file => file.endsWith('.ts'))
            .map(async file => {
                const hrefEventFile = pathToFileURL(join(eventsPath, file)).href
                const event = (await import(hrefEventFile)).default;

                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client.commands));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client.commands));
                }
            })
    );
};