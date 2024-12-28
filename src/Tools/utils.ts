import { Command } from '../Commands/Command';
import config from './config';

/**
 * Make request to discord API
 * @param {string} endpoint 
 * @param {*} options 
 * @returns 
 */
export async function DiscordRequest(endpoint: string, method: string, body?: any): Promise<Response> {
    const url = 'https://discord.com/api/v10/' + endpoint;

    const bodyString: string = body ? JSON.stringify(body) : "";

    console.log(bodyString);
    // Use of spread operator ... ensures that each option is accounted for
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${config.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'SteamBuddy (GitHub - SteamBuddy, 1.0.0)',
        },
        method: method,

        // TODO: Check if this can be here if the endpoint has no payload
        body: bodyString
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    return res;
}

/**
 * Install global commands on all guilds. Use this when features are production ready.
 * @param {string} appId The ID of the bot
 * @param {Command[]} commands The commands to be installed
 */
export async function InstallGlobalCommands(appId: string, commands: Command[]) {
    const endpoint = `applications/${appId}/commands`;

    const payloads: any[] = [];
    commands.forEach((command) => payloads.push(command.register()))

    try {
        await DiscordRequest(endpoint, 'PUT', payloads );
    } catch (err) {
        console.error(err);
    }
}

/**
 * Install Guild Commands, use this when testing new commands.
 * Be warned that the API request will overwrite all existing commands in the guild specified
 * @param {string} appId The public id of the bot
 * @param {string} guildId The id of the guild/server for commands to exist in
 * @param {*} commands The commands to overwrite
 */
export async function InstallGuildCommands(appId: string, guildId: string, commands: Command[]) {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    const payloads: any[] = [];
    commands.forEach((command) => payloads.push(command.register()))
    console.log(payloads)
    try {
        await DiscordRequest(endpoint, 'PUT', payloads).then(res => (
            console.log(`Command ${res} registered in guild: ${guildId}`))
        )
    } catch (err) {
        console.error(err);
    }
}