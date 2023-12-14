const eventLogger = require("bunyan").createLogger({ name: "eventHandler" });
const config = require("./../../config");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    // Check if the guild/user is blacklisted
    if (config.blacklist.enabled) {
      if (config.blacklist.users.includes(interaction.user.id)) {
        return interaction.reply({
          content: "You are blacklisted from using this bot",
          ephemeral: true,
        });
      }
      if (config.blacklist.guilds.includes(interaction.guild.id)) {
        return interaction.reply({
          content: "This guild is blacklisted from using this bot",
          ephemeral: true,
        });
      }
    }

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return interaction.reply({
          content: `Sorry, we couldn't find that command`,
          ephemeral: true,
        });

      try {
        await command.execute(interaction, client);
      } catch (error) {
        eventLogger.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({
        content: "This interaction is not a command!",
        ephemeral: true,
      });
    }
  },
};
