# src/commands

> This is the documentation for the commands directory.

This directory stores all the commands that the bot can execute. The commands are registered and executed by
the [commandHandler](../handlers/commandHandler.js).

## Creating a new command

To create a new command, find an appropriate directory to store the command in. If there is no appropriate directory,
just make a new one! Within the directory, create a new file. The file name should be the name of the command. For
example,
if you want to create a command called `ping`, the file name should be `ping.js`.

The file should export a `data` object, constructed with the [`SlashCommandBuilder`](slashCommandBuilder) class, and
an `execute` function, which is the function that will be executed when the command is called.

### Example

```js
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
```

[slashCommandBuilder]: https://discord.js.org/docs/packages/builders/main/SlashCommandBuilder:Class
