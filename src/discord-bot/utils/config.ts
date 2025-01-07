import { configDotenv } from "dotenv"

configDotenv();

export const STEAM_TOKEN = process.env.STEAM_TOKEN as string;
export const STEAM_ID = process.env.STEAM_ID as string;
    
export const APP_ID = process.env.APP_ID as string;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
export const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY as string;

export const REDIRECT_URI = process.env.REDIRECT_URI as string;
export const TEST_GUILD = process.env.TEST_GUILD as string;
export const PORT = process.env.PORT as number | undefined;