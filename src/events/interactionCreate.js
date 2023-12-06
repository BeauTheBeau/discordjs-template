const eventLogger = require("bunyan").createLogger({ name: "eventHandler" });

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
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
