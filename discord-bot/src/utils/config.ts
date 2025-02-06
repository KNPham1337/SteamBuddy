import { configDotenv } from "dotenv"

interface Config {
    STEAM_TOKEN: string,
    STEAM_ID: string,

    APP_ID: string,
    DISCORD_TOKEN: string,
    DISCORD_PUBLIC_KEY: string,

    REDIRECT_URI: string,
    TEST_GUILD: string,
    PORT: number | undefined,
    DEV_FRONTEND_URL: string,
    DEV_BACKEND_URL: string,
}

configDotenv();

const config: Config = {
    STEAM_TOKEN: process.env.STEAM_TOKEN as string,
    STEAM_ID: process.env.STEAM_ID as string,
    APP_ID: process.env.APP_ID as string,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
    DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY as string,

    REDIRECT_URI: process.env.REDIRECT_URI as string,
    TEST_GUILD: process.env.TEST_GUILD as string,
    PORT: process.env.PORT as number | undefined,
    DEV_FRONTEND_URL: process.env.DEV_FRONTEND_URL as string,
    DEV_BACKEND_URL: process.env.DEV_BACKEND_URL as string,
}

export default config;