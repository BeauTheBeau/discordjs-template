const clc = require("cli-color");
const config = require("../../config.js");

function logBotInfo(logger, client) {
  logger.info(
    `Logged in as ${clc.green(client.user.tag)}` +
      `\n\tID: ${clc.green(client.user.id)}` +
      `\n\tGuilds: ${clc.green(client.guilds.cache.size)}`,
  );
}

module.exports = {
  name: `ready`,
  once: true,
  async execute(client) {
    logBotInfo(client.logger, client);

    // Set presence
    if (config.bot.presence.enabled) {
      client.logger.info(
        `Setting presence every ${config.bot.presence.interval}ms`,
      );
      setInterval(() => {
        const presence =
          config.bot.presence.list[
            Math.floor(Math.random() * config.bot.presence.list.length)
          ];
        client.user.setPresence({
          activities: [{ name: presence.text, type: presence.type }],
        });
      }, config.bot.presence.interval);
    }
  },
};
