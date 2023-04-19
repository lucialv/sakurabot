const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

const fs = require("fs");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isStringSelectMenu) {
      if (interaction.customId === "helpMenu") {
        const selection = interaction.values[0];
        const commands = fs
          .readdirSync(`../Commands/Public/${selection}`) // This will be your command folder path from index.
          .filter((file) => file.endsWith(".js"))
          .map((file) => {
            const command = require(`../Commands/Public/${selection}/${file}`); // This is the command folder path from your Event file.
            return command;
          });

        const commandEmbedFields = await Promise.all(
          commands.map(async (cmd) => {
            const getCommandID = (await client.application.commands.fetch())
              .filter((c) => c.name === cmd.data.name)
              .map((c) => c.id)[0];
            return {
              name: `<:Command:1091483142751273010> </${cmd.data.name}:${getCommandID}>`, // Emoji before command name
              value: `<:Description:1091483192076279828> ${cmd.data.description}`, // Description emoji.
            };
          })
        );

        const embed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setDescription(
            `${commandEmbedFields
              .map((field) => `${field.name}\n${field.value}`)
              .join("\n\n")}`
          );

        await interaction.update({
          embeds: [embed],
        });
      }
    }
  },
};
