const { Interaction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    if (command.developer && interaction.user.id !== "997571433280577656")
      return interaction.reply({
        content: "Este comando solo está disponible para la desarrolladora!",
        ephemeral: true,
      });

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
