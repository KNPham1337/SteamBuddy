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
};

const config: Config = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    STEAM_TOKEN: process.env.STEAM_TOKEN as string,
    SESSION_SECRET: process.env.SESSION_SECRET as string,
};

export default config;