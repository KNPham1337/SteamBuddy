import { TestCommand } from "./guild_commands";
import { Command } from "./Command";
import config from "../Tools/config";
import { InstallGuildCommands } from "../Tools/utils";

const testCommand = new TestCommand();
const ALL_COMMANDS: Command[] = [testCommand];
InstallGuildCommands(config.APP_ID, config.TEST_GUILD, ALL_COMMANDS);