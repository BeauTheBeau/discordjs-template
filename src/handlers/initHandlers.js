/**
 * @file initHandlers.js
 * @description Initializes handlers, such as commands abd events.
 */

// Import dependencies
const fs = require('fs');
const path = require('path');
const config = require('../../config.js');

// Import handlers
const loadCommands = require('./commandHandler.js');
const loadEvents = require('./eventHandler.js');

module.exports = async (client) => {

    await loadCommands(client);

}

