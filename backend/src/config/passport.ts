import SteamProfile from "@backend/types/types.js";
import passport from "passport";
import SteamStrategy from 'passport-steam';
import config from "./config.js";

passport.use(new SteamStrategy({
    returnURL: `http://localhost:${config.PORT}/auth/steam/callback`,
    realm: `http://localhost:${config.PORT}`,
    apiKey: config.STEAM_TOKEN,
},
    (_, profile, done) => {
        const steamID = profile.id;
        done(null, { steamID, profile });
    }
));

// TODO replace serializeUser and deserializeUser with actual db info when implemented
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: { steamID: string; profile: SteamProfile }, done) => {
    done(null, obj);
});

export default passport;