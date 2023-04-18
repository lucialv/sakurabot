const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("¡Muestra los comandos disponibles del bot!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const file = new AttachmentBuilder("Images/help.png", {
      name: `help.png`,
    });
    const embed = new EmbedBuilder()
      .setColor("#cc96c1")
      .setTitle("Menú de ayuda")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/726893195052711948.gif?size=40"
      )
      .setImage("attachment://help.png")
      .setDescription(
        "Esta es mi lista de comandos por ahora <:ghostHeart:1097558572872765480>"
      )
      .addFields({
        name: "Diversión",
        value:
          "<:flecha:1097547930237407242> `atractivo`, `memide`, `trans`, `pregunta`, `tequiero`, `amor`, `suerte`",
        inline: false,
      })
      .addFields({
        name: "Útil",
        value: "<:flecha:1097547930237407242> `memberinfo`",
        inline: false,
      })
      .addFields({
        name: "Moderación",
        value: "<:flecha:1097547930237407242> `clear`, `timeout`",
        inline: false,
      })
      .setTimestamp()
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
