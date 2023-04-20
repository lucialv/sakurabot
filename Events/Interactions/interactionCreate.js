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
          .readdirSync(`./Commands/${selection}`) // This will be your command folder path from index.
          .filter((file) => file.endsWith(".js"))
          .map((file) => {
            const command = require(`../../Commands/${selection}/${file}`); // This is the command folder path from your Event file.
            return command;
          });

        const commandEmbedFields = await Promise.all(
          commands.map(async (cmd) => {
            const getCommandID = (await client.application.commands.fetch())
              .filter((c) => c.name === cmd.data.name)
              .map((c) => c.id)[0];
            return {
              name: `> </${cmd.data.name}:${getCommandID}> <a:itemblueheartclo:1098696665738793052>`, // Emoji before command name
              value: `<a:bouncyarrow1:1098652756824293546> ${cmd.data.description}`, // Description emoji.
            };
          })
        );

        const embed = new EmbedBuilder()
          .setTitle(`¡Comandos de ${selection}!`)
          .setTimestamp()
          .setFooter({
            text: `Solicitado por: ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setColor("#cc96c1")
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
