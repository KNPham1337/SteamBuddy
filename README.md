# SteamBuddy

Discord bot that connects users steam accounts and friend information onto discord.

## Architecture

The bot is built using a microservices architecture. The bot is split into two main components: the backend and the frontend. The backend is responsible for handling the communication between the bot and the Steam API. The frontend is responsible for handling the communication between the bot and the Discord API.

### Backend

**Node.js**
Provide the Server runtime environment that the bot will operate on. The npm package management tool will allow us to install required libraries. Node.js provides asynchronous programming to handle messages and interactions with users.

**Express.js**
Express.js is a web application framework for Node.js. It is used to create a RESTful API that will handle the communication between the bot and the Steam API.

**Discord.js**
Discord.js is a powerful node.js module that allows you to interact with the Discord API very easily. It takes a much more object-oriented approach than most other JS Discord libraries, making your bot's code significantly tidier and easier to comprehend.

**Discord-interactions**
Discord-interactions is a library that allows you to create and manage interactions with Discord's API. It is used to create slash commands and buttons that will be used to interact with the bot.

**steamapi**
Steamapi is a node.js module that allows you to interact with the Steam API. It is used to retrieve information about a user's Steam account.

**dotenv**
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

**nodemon**
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

### Frontend

**Discord API**
Discord API is used to create and manage interactions with the Discord bot. It is used to create slash commands and buttons that will be used to interact with the bot. [Discord API](https://discord.com/developers/docs/intro)

**Steam API**
Steam API is used to retrieve information about a user's Steam account. It is used to get information about a user's games, friends, and other information. [Steam API](https://developer.valvesoftware.com/wiki/Steam_Web_API)

# Getting Started

npm install
node bot.js

# Planned Features

- Query a users library
- Choose a random game a day to play (single or multiplayer)
- Suggest new games based on library
- Lookup metrics of user steam profile
- Game Discovery & Engagement
- Game Night Organizer
- Challenges
- Stats (weekly, daily)
- Game Trivia (point based system)
- Choose a game to play
- Leaderboard
- Game Recommendations
