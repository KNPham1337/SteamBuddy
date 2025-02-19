import { Request } from "express";
import { AuthenticatedUser, DiscordProfile } from "@backend/types/types.js";
import * as crypto from "crypto";


declare module "express-session" {
    interface SessionData {
        passport?: { user: { profile: AuthenticatedUser, discordProfile: DiscordProfile } };
        tempDiscordProfile?: DiscordProfile;
    }
}

export function generateSessionID() {
    // const sessionID = crypto.randomBytes(64).toString('hex');
    const sessionID = crypto.randomUUID().toString().replace('-', '');
    // example session ID
    // 24be4aa4235c4bd7a49ff53276a2623b
    return sessionID;
}

export function storeDiscordSession(req: Request, discordProfile: DiscordProfile) {
    req.session.tempDiscordProfile = discordProfile;
}

export function getDiscordSession(req: Request): DiscordProfile | null {
    return req.session.passport?.user.discordProfile || null;
}