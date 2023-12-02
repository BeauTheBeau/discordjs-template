'use strict';

require('dotenv').config();
const {REST, Routes, EmbedBuilder} = require('discord.js');
const cmdLogger = require('bunyan').createLogger({name: 'commandHandler'});
const path = require('path');
const {readdirSync} = require('fs');
const fs = require("fs");

const token = process.env.TOKEN;
const rest = new REST({version: '9'}).setToken(token);

module.exports = async client => {
    const commandPath = path.join(__dirname, '../commands');

    ensureCommandDirectoryExists(commandPath);

    const commandsList = retrieveCommandsListFromDirectories(commandPath);

    if(commandsList.length > 0) {
        await registerCommands(client, commandsList);
    } else {
        cmdLogger.warn('No commands found.');
    }
};

const ensureCommandDirectoryExists = commandPath => {
    if (fs.existsSync(commandPath)) return cmdLogger.info('Commands directory exists.');
    cmdLogger.warn('Commands directory does not exist. Creating it now...');
    fs.mkdirSync(commandPath);
};

const retrieveCommandsListFromDirectories = commandPath => {
    const commandDirs = readdirSync(commandPath);
    const commandsList = [];

    for (const dir of commandDirs) {
        const fileNamesInDir = readdirSync(path.join(commandPath, dir));
        for(const fileName of fileNamesInDir){
            if(! fileName.endsWith('.js')) continue;

            const command = require(path.join(commandPath, dir, fileName));
            cmdLogger.info(`Registered command ${command.data.name}`);

            commandsList.push(command.data.toJSON());
        }
    }

    return commandsList;
};

async function registerCommands(client, commandsList){
    try {
        cmdLogger.info('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commandsList },
        );
        cmdLogger.info(`Successfully reloaded application (/) commands.`);
    } catch (e) {
        cmdLogger.error(`Error refreshing application (/) commands: ${e}`);
    }
}