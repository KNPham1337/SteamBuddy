import { TestCommand } from "./guild_commands.js";
import { Command } from "./Command.js";
import config from "../Tools/config.js";
import { InstallGuildCommands } from "../Tools/utils.js";

const testCommand = new TestCommand();
const ALL_COMMANDS: Command[] = [testCommand];
InstallGuildCommands(config.APP_ID, config.TEST_GUILD, ALL_COMMANDS);