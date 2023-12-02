/**
 * @file index.js
 * @description Entry point for the Discord bot.
 * This file initializes the bot and sets up logging functionalities.
 */

// Dependencies
const config = require("../config.js");
const { Client, Collection } = require("discord.js");
const bunyan = require("bunyan");
const path = require("path");
const clc = require("cli-color");
require("dotenv").config();

// Client & Logger setup
const logger = setupLogger();
const client = setupClientAndData();

/**
 * Loads various handlers for the bot (commands, events, etc).
 * @param {import("discord.js").Client} client - The Discord client instance.
 */
const loadHandlers = require("./handlers/initHandlers.js");
loadHandlers(client);

/**
 * Sets up the Discord bot client and initializes necessary data structures.
 * @returns {import("discord.js").Client} - The initialized Discord client.
 */
function setupClientAndData() {
  const client = new Client({
    intents: config.intents.list,
    allowedMentions: config.allowedMentions || {
      parse: ["users", "roles"],
      repliedUser: true,
    },
  });

  // Collections for commands, aliases, etc
  client.commands = new Collection();
  client.aliases = new Collection();
  client.events = new Collection();
  client.buttons = new Collection();
  client.modals = new Collection();
  client.logger = logger;

  // Login
  client.login(process.env.TOKEN);
  return client;
}

/**
 * Sets up the logger for the bot.
 * @returns {import("bunyan").Logger} - The configured logger instance.
 */
function setupLogger() {
  return bunyan.createLogger({
    name: "discord-bot",
    streams: [
      { level: config.logging.level || "info", stream: process.stdout },
      {
        level: "error",
        path:
          config.logging.filePath || path.join(__dirname, "./logs/errors.log"),
      },
    ],
  });
}

module.exports = { client, logger };
