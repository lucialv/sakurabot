const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Este comando está desactualizado!",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "997571433280577656")
      return interaction.reply({
        content: "Este comando solo está disponible para la desarrolladora!",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile)
        return interaction.reply({
          content: "Este comando está desactualizado!",
          ephemeral: true,
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
