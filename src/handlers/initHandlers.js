/**
 * @file initHandlers.js
 * @description Initializes handlers, such as commands abd events.
 */

// Import handlers
const loadCommands = require("./commandHandler.js");
const loadEvents = require("./eventHandler.js");

module.exports = async (client) => {
  await loadCommands(client);
  await loadEvents(client);
};
