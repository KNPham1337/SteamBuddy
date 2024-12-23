import { config } from 'dotenv';
import SteamAPI from 'steamapi';

config();

if (!process.env.STEAM_TOKEN) throw new Error('missing or invalid Steam api token');

const steam = new SteamAPI(process.env.STEAM_TOKEN);

steam.getUserBans(process.env.STEAM_ID).then(bans => {
    console.log(bans);
});

steam.getUserFriends(process.env.STEAM_ID).then(friends => {
    console.log(friends);
});

steam.getUserGroups(process.env.STEAM_ID).then(groups => {
    console.log(groups);
});

steam.getUserLevel(process.env.STEAM_ID).then(level => {
    console.log(level);
});

steam.getUserOwnedGames(process.env.STEAM_ID).then(games => {
    console.log(games);
});

steam.getUserRecentGames(process.env.STEAM_ID).then(recentGames => {
    console.log(recentGames);
});

steam.getUserSummary(process.env.STEAM_ID).then(summary => {
    console.log(summary);
});

steam.getUserBadges(process.env.STEAM_ID).then(achievments => {
    console.log(achievments);
});

// Requires game id info
// steam.getUserAchievements(process.env.STEAM_ID).then(achievments => {
//     console.log(achievments);
// });
// 
// steam.getUserStats(process.env.STEAM_ID).then(stats => {
//     console.log(stats);
// });