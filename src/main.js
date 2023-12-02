/**
 * @file index.js
 * @description Entry point for the Discord bot.
 * This file initializes the bot and sets up logging functionalities.
 */

// Dependencies
const config = require('../config.js');
const { Client, Collection } = require('discord.js');
const bunyan = require('bunyan');
const path = require('path');
const clc = require("cli-color");
require('dotenv').config();

// Client & Logger setup
const client = setupClientAndData();
const logger = setupLogger();

// Event Listener
client.on('ready', handleClientReady);

function setupClientAndData() {
    const client = new Client({
        intents: config.intents.list,
        allowedMentions: config.allowedMentions || { parse: ['users', 'roles'], repliedUser: true },
    });

    // Collections for commands, aliases, etc
    client.commands = new Collection();
    client.aliases = new Collection();
    client.events = new Collection();
    client.buttons = new Collection();
    client.modals = new Collection();

    // Login
    client.login(process.env.TOKEN);
    return client;
}

function setupLogger() {
    return bunyan.createLogger({
        name: 'discord-bot',
        streams: [
            { level: config.logging.level || 'info', stream: process.stdout },
            { level: 'error', path: config.logging.filePath || path.join(__dirname, './logs/errors.log') },
        ],
    });
}

async function handleClientReady() {

    logBotInfo(logger, client);

    const loadHandlers = require('./handlers/initHandlers.js');
    await loadHandlers(client);

}

function logBotInfo(logger, client) {
    logger.info(
        `Logged in as ${clc.green(client.user.tag)}`
        + `\n\tID: ${clc.green(client.user.id)}`
        + `\n\tGuilds: ${clc.green(client.guilds.cache.size)}`
    )
}