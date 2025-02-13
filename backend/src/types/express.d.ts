import { DiscordProfile } from "./types.js";

// declare module 'express-session' {
// 
//     interface SessionData {
// 
//         profile?: SteamProfile;
// 
//     }
// 
// }

declare module "express-session" {
    interface SessionData {
        passport?: { user: { profile: AuthenticatedUser, discordProfile: DiscordProfile } };
        tempDiscordProfile?: DiscordProfile;
    }
}