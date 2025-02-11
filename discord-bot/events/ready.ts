import { Client, Events } from "discord.js";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client<true>) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log(`CTRL + C to kill process`);
    },
};