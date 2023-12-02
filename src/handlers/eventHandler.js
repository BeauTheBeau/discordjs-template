"use strict";

require("dotenv").config();
const eventLogger = require("bunyan").createLogger({ name: "eventHandler" });
const path = require("path");
const { readdirSync } = require("fs");
const fs = require("fs");

module.exports = async (client) => {
  const eventPath = path.join(__dirname, "../events");

  ensureEventDirectoryExists(eventPath);

  const eventFiles = retrieveEventFilesFromDirectory(eventPath);

  if (eventFiles.length > 0) registerEvents(client, eventFiles);
  else eventLogger.warn("No events found.");
};

const ensureEventDirectoryExists = (eventPath) => {
  if (fs.existsSync(eventPath))
    return eventLogger.info("Events directory exists.");
  eventLogger.warn("Events directory does not exist. Creating it now...");
  fs.mkdirSync(eventPath);
};

const retrieveEventFilesFromDirectory = (eventPath) => {
  const eventFiles = readdirSync(eventPath);
  return eventFiles.filter((file) => file.endsWith(".js"));
};

function registerEvents(client, eventFiles) {
  for (const file of eventFiles) {
    const event = require(path.join(__dirname, "../events", file));
    const eventName = event.name;
    eventLogger.info(`Registered event ${eventName}`);
    client.on(eventName, event.execute.bind(null, client));
  }
}
