import SteamProfile from "./types.js";

declare module 'express-session' {

    interface SessionData {

        profile?: SteamProfile;

    }

}