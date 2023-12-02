/**
 * @file config.example.js
 * @description Example config file for the bot. You should rename this file to config.js and fill in the values.
 * @see @{@link docs/CONFIG.md|CONFIG.md}
 */

const {ActivityType, GatewayIntentBits} = require('discord.js');

const config = {};

// Core information
config.bot = {};
config.bot.name = "Discord Bot";
config.bot.version = "0.0.1";
config.bot.developers = [];
config.bot.owners = [];

// Intents
//   See https://discord.com/developers/docs/topics/gateway#list-of-intents
//   & node_modules/discord-api-types/gateway/v10.d.ts
config.intents = {};
config.intents.list = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
];

// GitHub information
config.github = {};
config.github.enabled = true;
config.github.repo = "https://github.com/username/repo";
config.github.branch = "master";

// Presence information
config.bot.presence = {}
config.bot.presence.enabled = true;
config.bot.presence.interval = 60 * 1000; // Interval, in milliseconds, between presence changes
config.bot.presence.list = [
    {type: ActivityType.Watching, text: "for commands"},
    {type: ActivityType.Listening, text: "your favourite music"},
    {type: ActivityType.Playing, text: "Super Tux Kart"}
];

// IDs of users/guilds to be blacklisted from using the bot
config.blacklist = {};
config.blacklist.enabled = false;
config.blacklist.users = [];
config.blacklist.guilds = [];

// Logging configuration
config.logging = {};
config.logging.enabled = true;
config.logging.level = "info";
config.logging.filePath = "./logs/log.log";

module.exports = config;