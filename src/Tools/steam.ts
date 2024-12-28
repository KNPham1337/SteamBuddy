import config from './config';
import SteamAPI from 'steamapi';

if (!config.STEAM_TOKEN) throw new Error('missing or invalid Steam api token');

const steam = new SteamAPI(config.STEAM_TOKEN);

steam.getUserBans(config.STEAM_ID).then(bans => {
    console.log(bans);
});

steam.getUserFriends(config.STEAM_ID).then(friends => {
    console.log(friends);
});

steam.getUserGroups(config.STEAM_ID).then(groups => {
    console.log(groups);
});

steam.getUserLevel(config.STEAM_ID).then(level => {
    console.log(level);
});

steam.getUserOwnedGames(config.STEAM_ID).then(games => {
    console.log(games);
});

steam.getUserRecentGames(config.STEAM_ID).then(recentGames => {
    console.log(recentGames);
});

steam.getUserSummary(config.STEAM_ID).then(summary => {
    console.log(summary);
});

steam.getUserBadges(config.STEAM_ID).then(achievments => {
    console.log(achievments);
});

// // Requires game id info
// steam.getUserAchievements(config.STEAM_ID).then(achievments => {
//     console.log(achievments);
// });
// 
// steam.getUserStats(config.STEAM_ID).then(stats => {
//     console.log(stats);
// });