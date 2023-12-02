# src/handlers

> This is the documentation for the `handlers/` directory.

This directory handles the loading and execution of commands and events.

## Command handler

[Jump to File](./commandHandler.js)

This module is utilized to manage the loading, registration, and execution of slash command. It checks for the existence
of a command directory, retrieves commands from that directory, and registers
them with Discord API endpoints.

### Functions

- `ensureCommandDirectoryExists`

  - Purpose: Checks if the directory for storing commands exists, creates it if absent.
  - Parameters: commandPath (String) - Path to the directory storing commands.

- `retrieveCommandsListFromDirectories`

  - Purpose: Retrieves a list of commands from directories, registering them for use.
  - Parameters: commandPath (String) - Path to the directory storing commands.
  - Returns: An array of command objects retrieved from the directories.

- `registerCommands`
  - Purpose: Registers the commands in the Discord application.
  - Parameters:
    - client (Client) - The Discord bot client instance.
    - commandsList (Array) - List of command objects to register.

[client]: https://discord.js.org/docs/packages/core/0.5.0/Client:Class
