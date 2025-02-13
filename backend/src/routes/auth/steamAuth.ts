import config from "@backend/config/config.js";
import passport from "@backend/config/passport.js";
import { DiscordProfile, SteamProfile } from "@backend/types/types.js";
import { getDiscordSession } from "@backend/utils/session.js";
import express from 'express';
import jwt from "jsonwebtoken";

const router = express.Router();
const FRONTEND_URL = config.DEV_FRONTEND_URL;

const generateJWT = (steamID: string) => {
    return jwt.sign({ steamID }, config.JWT_SECRET, { expiresIn: "1h" });
}

router.get("/auth/steam", passport.authenticate("steam"));

// Steam OpenID callback URL
router.get("/auth/steam/callback", passport.authenticate("steam", { failureRedirect: "/" }), async (req: express.Request, res: express.Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Steam authentication failed" });
            return;
        }

        const discordID = getDiscordSession(req);

        if (!discordID) {
            res.status(400).json({ error: "No Discord ID found. Please retry authentication." });
            return;
        }

        console.log("User:", req.user);
        const { profile: steamProfile, discordProfile } = req.user as { profile: SteamProfile, discordProfile: DiscordProfile };
        console.log("Steam Profile:", steamProfile);

        // Save to the database
        // await saveUserToDatabase({ discordID, steamID });
        // await saveUserProfilesToDatabase()

        // Generate a JWT and send it to the client, allows for a user to come back to the site without needing to sign in again
        const token = generateJWT(steamProfile._json.steamid);

        // Send the JWT as a cookie (httpOnly for security)
        res.cookie("authToken", token, { maxAge: 900000, httpOnly: true });
        res.redirect(`${FRONTEND_URL}/link-success`);
    } catch (error) {
        console.error(`Steam authentication error:`, error);
        res.status(500).send('Error authenticating with Steam');
    }
});

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

router.get("/dashboard", authenticateJWT, (req: express.Request, res: express.Response) => {
    res.json({ message: `Welcome to your dashboard!`, user: req.user });
});
// 
// router.get("/user-info", authenticateJWT, (req: Express.Request, res: express.Response) => {
//     res.json(req.session.profile)
// })

// This is supposed to clear cookies and make you login next time you rerun the server but for now you can just log off of steam manually to get the same effect
// router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(`Failed to destroy session: ${err}`);
//         }
//     });
//     res.clearCookie("authToken");
//     next();
// })

export default router;