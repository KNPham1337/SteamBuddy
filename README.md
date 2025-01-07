# SteamBuddy

Discord bot that connects users steam accounts and friend information onto discord.

## Architecture

The bot is built using a microservices architecture. The bot is split into two main components: the backend and the frontend. The backend is responsible for handling the communication between the bot and the Steam API. The frontend is responsible for handling the communication between the bot and the Discord API.

### Backend

**Node.js**\
Provide the Server runtime environment that the bot will operate on. The npm package management tool will allow us to install required libraries. Node.js provides asynchronous programming to handle messages and interactions with users.

**Express.js**\
Express.js is a web application framework for Node.js. It is used to create a RESTful API that will handle the communication between the bot and the Steam API.

**Discord.js**\
Discord.js is a powerful node.js module that allows you to interact with the Discord API very easily. It takes a much more object-oriented approach than most other JS Discord libraries, making your bot's code significantly tidier and easier to comprehend.

**Discord-interactions**\
Discord-interactions is a library that allows you to create and manage interactions with Discord's API. It is used to create slash commands and buttons that will be used to interact with the bot.

**steamapi**\
[SteamAPI](https://github.com/xDimGG/node-steamapi/blob/acff4626568c176b9787caac1c8b9174de5ccf6f/docs/classes/default.md) is a node.js module that allows you to interact with the Steam API. It is used to retrieve information about a user's Steam account.

**dotenv**\
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### Frontend

**Discord API**\
Discord API is used to create and manage interactions with the Discord bot. It is used to create slash commands and buttons that will be used to interact with the bot. [Discord API](https://discord.com/developers/docs/intro)

**Steam API**\
Steam API is used to retrieve information about a user's Steam account. It is used to get information about a user's games, friends, and other information. [Steam API](https://developer.valvesoftware.com/wiki/Steam_Web_API)

## Development

**Nodemon**\
 Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

**Ngrok**\
ngrok is a tool that allows you to expose a web server running on your local machine to the internet. This is useful for testing your bot in a live environment.

# Getting Started

- npm install
- npm run dev

## Setting up ngrok

0. Create account on [ngrok](https://ngrok.com/)
1. npm install ngrok

## Using ngrok

1. Run npx ngrok http 3000 in the terminal. This will create a forwarding address that will allow the bot to receive interactions from Discord.
2. Add /interactions to the end of the forwarding address. e.g. https://12345678.ngrok.io/interactions.
3. Update the Discord Developer Portal with the forwarding address. Go to the Discord Developer Portal and click on the bot you created. Interactions Endpoint URL should be set to the forwarding address. e.g. https://12345678.ngrok.io/interactions.

The bot should now be able to receive interactions from Discord. The forwarding address will change every time you run ngrok, so you will need to update the Discord Developer Portal. e.g. https://12345678.ngrok.io/interactions.

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

# Reducing API Requests

## Discord

Discord has a rate limit of 5 requests per second. To avoid hitting the rate limit, we can use a queue to manage the requests. The queue will store the requests and send them one at a time.\

## Steam

Steam has a rate limit of 100,000 requests per day. To avoid hitting the rate limit, we can cache the responses from the Steam API. The cache will store the responses and return them if the same request is made within a certain time frame. Otherwise, Database can be used to store the responses from the Steam API. The database will store the responses and return them if the same request is made within a certain time frame.\

Caching can be done using Redis. Redis is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries, and streams. Another alternative is node-cache. node-cache is a simple in-memory cache for node.js. It allows you to store key-value pairs in memory and set an expiration time for each key-value pair.\

A relational database such as MySQL or PostgreSQL can be used to store the responses from the Steam API. The database will store the responses and return them if the same request is made within a certain time frame. The database can be queried to check if the response is already stored. If the response is already stored, the response can be returned from the database. If the response is not stored, the response can be retrieved from the Steam API and stored in the database.

Possible databases to use:

- MySQL
- PostgreSQL
- MongoDB
- sqlite3 (development)

PLAN

- express for hosting a local development server
- axios, steamapi for making api calls to external apis
- discord.js to handle registering/creation/interactions on discord
