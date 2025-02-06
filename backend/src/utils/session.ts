import { Request } from "express";
// import session from "express-session";

declare module "express-session" {
    interface SessionData {
        discordId: string;
    }
}

export function storeDiscordSession(req: Request, discordId: string) {
    req.session.discordId = discordId;
    console.log(req.session.discordId);
}

export function getDiscordSession(req: Request): string | null {
    console.log(req.session.discordId);
    return req.session.discordId || null;
}