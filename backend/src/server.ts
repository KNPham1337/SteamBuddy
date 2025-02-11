import express from 'express';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from 'cors';

import SteamProfile from './types/types.js'

import config from './utils/config.js';

const app = express();
const PORT = 3000;
const FRONTEND_URL = 'http://localhost:5173';

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
}));

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new SteamStrategy({
    returnURL: `http://localhost:${PORT}/auth/steam/return`,
    realm: `http://localhost:${PORT}`,
    apiKey: config.STEAM_TOKEN,
},
    (identifier, profile, done) => {
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

const generateJWT = (steamID: string) => {
    return jwt.sign({ steamID }, config.JWT_SECRET, { expiresIn: "1h" });
}

app.get("/auth/steam", passport.authenticate("steam"));

let PROFILE: SteamProfile;

// Steam OpenID callback URL
app.get(
    "/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    (req: express.Request, res: express.Response): void => {
        if (!req.user) {
            res.status(401).send("Authentication failed");
            return;
        }

        console.log(req.user);

        // Generate a JWT and send it to the client
        const { steamID, profile } = req.user as { steamID: string, profile: SteamProfile };
        const token = generateJWT(steamID);
        PROFILE = profile

        // Send the JWT as a cookie (httpOnly for security)
        res.cookie("authToken", token, { httpOnly: true });
        res.redirect(`${FRONTEND_URL}/dashboard`);
    }
);

const authenticateJWT = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    const token = req.cookies.authToken;

    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).send(`${err}: Invalid token`);
    }
};

app.get("/dashboard", authenticateJWT, (req: express.Request, res: express.Response) => {
    res.json({ message: `Welcome to your dashboard!`, user: req.user });
});

app.get("/user-info", authenticateJWT, (req: express.Request, res: express.Response) => {
    // const { steamID } = req.user as { steamID: string };
    // req.user
    // res.json(req.user);
    res.json(PROFILE)
    console.log(PROFILE);
})

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Home Page");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});