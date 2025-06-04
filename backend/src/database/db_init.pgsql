CREATE TABLE IF NOT EXISTS auth_temp (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discord_id BIGINT NOT NULL UNIQUE,
    steam_id BIGINT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    discord_id BIGINT UNIQUE NOT NULL,
    steam_id BIGINT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Holds discord bearer tokens

-- DROP TABLE discord_tokens;
CREATE TABLE IF NOT EXISTS discord_tokens (
    discord_id BIGINT REFERENCES users(discord_id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP NOT NULL
);
-- 
-- INSERT INTO users (discord_id, steam_id)
-- VALUES (111111, 222222);
-- 
-- INSERT INTO discord_tokens(discord_id, access_token, refresh_token, expires_at)
-- VALUES(111111,'awdawdadad','awdawdadawdawd', NOW() + INTERVAL '7 days');
-- 
-- -- DELETE FROM discord_tokens;
-- 
-- SELECT * FROM discord_tokens;
