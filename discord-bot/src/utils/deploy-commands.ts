import { loadCommands } from "./handlers/commandHandler.js";
import { Routes, REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import path from "node:path";
import config from "./config.js";
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

// Load each command dynamically
(await loadCommands(path.join(__dirname, '..', 'commands'))).forEach((command) => {
	commands.push(command.data.toJSON());
});

// Make discord API request
const rest = new REST().setToken(config.DISCORD_TOKEN);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set

		let data = [];
		if (process.argv[2] === 'local') {
			data = await rest.put(
				Routes.applicationGuildCommands(config.APP_ID, config.TEST_GUILD),
				{ body: commands },
			) as [];
		} else if (process.argv[2] === 'global') {
			data = await rest.put(
				Routes.applicationCommands(config.APP_ID),
				{ body: commands },
			) as [];
		}


		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
