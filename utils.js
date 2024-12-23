import 'dotenv/config'

/**
 * Make request to discord API
 * @param {*} endpoint 
 * @param {*} options 
 * @returns 
 */
export async function DiscordRequest(endpoint, options) {
    const url = 'https://discord.com/api/v10/' + endpoint;

    // options contains a body, convert to json
    if (options.body) options.body = JSON.stringify(options.body);

    // Use of spread operator ... ensures that each option is accounted for
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'SteamBuddy (GitHub - SteamBuddy, 1.0.0)',
        },
        ...options
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
 * @param {*} appId The ID of the bot
 * @param {*} commands The commands to be installed
 */
export async function InstallGlobalCommands(appId, commands) {
    const endpoint = `applications/${appId}/commands`;

    try {
        res = await DiscordRequest(endpoint, { method: 'PUT', body: commands });
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
export async function InstallGuildCommands(appId, guildId, commands) {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    try {
        res = await DiscordRequest(endpoint, { method: 'PUT', body: commands }).then(response => (
            console.log(`Commands registered in guild: ${guildId}`)
        ));
    } catch (err) {
        console.error(err);
    }
}