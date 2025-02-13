import { Request } from "express";
import { AuthenticatedUser, DiscordProfile } from "@backend/types/types.js";

declare module "express-session" {
    interface SessionData {
        passport?: { user: { profile: AuthenticatedUser, discordProfile: DiscordProfile } };
        tempDiscordProfile?: DiscordProfile;
    }
}

export function storeDiscordSession(req: Request, discordProfile: DiscordProfile) {
    req.session.tempDiscordProfile = discordProfile;
}

export function getDiscordSession(req: Request): DiscordProfile | null {
    return req.session.passport?.user.discordProfile || null;
}