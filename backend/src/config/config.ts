import dotenv from 'dotenv';

dotenv.config();

if (process.env.JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is undefined');
};

if (process.env.STEAM_TOKEN === undefined) {
    throw new Error('STEAM_TOKEN is undefined');
};

if (process.env.SESSION_SECRET === undefined) {
    throw new Error('SESSION_SECRET is undefined');
}

interface Config {
    JWT_SECRET: string;
    STEAM_TOKEN: string;
    SESSION_SECRET: string;

    DEV_FRONTEND_URL: string;
    DEV_BACKEND_URL: string;

    DISCORD_CLIENT_ID: string,
    DISCORD_CLIENT_SECRET: string;


    PORT: number;
};

const config: Config = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    STEAM_TOKEN: process.env.STEAM_TOKEN as string,
    SESSION_SECRET: process.env.SESSION_SECRET as string,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,


    DEV_FRONTEND_URL: process.env.DEV_FRONTEND_URL as string,
    DEV_BACKEND_URL: process.env.DEV_BACKEND_URL as string,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};

export default config;