import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import session from "express-session";
import passport from 'passport';

import steamAuthRoutes from './routes/auth/steamAuth.js'
import discordAuthRoutes from './routes/auth/discordAuth.js'

import config from "./config/config.js";

const app = express();
const DEV_FRONTEND_URL = config.DEV_FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
}));

// Allows backend to communicate with frontend website
app.use(cors({ origin: DEV_FRONTEND_URL, credentials: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(discordAuthRoutes);
app.use(steamAuthRoutes);

export default app;