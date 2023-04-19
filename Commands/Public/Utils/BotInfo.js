const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("¡Te da información acerca del bot!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const file = new AttachmentBuilder("Images/sakuratree.png", {
      name: `sakuratree.png`,
    });
    const embed = new EmbedBuilder()
      .setColor("#cc96c1")
      .setTitle("Bot Info")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/726893195052711948.gif?size=40"
      )
      .setImage("attachment://sakuratree.png")
      .setDescription(
        "Información útil del bot. <a:HeartsBubblePink:1097980344818470985>"
      )
      .addFields({
        name: "Nombre del bot",
        value: "Sakura Tree",
        inline: true,
      })
      .addFields({
        name: "ID",
        value: `${client.user.id}`,
        inline: true,
      })
      .addFields({
        name: "Developer",
        value: `<@997571433280577656>`,
        inline: true,
      })
      .addFields({
        name: "Website",
        value: `[mishu.dev](https://mishu.dev)`,
        inline: true,
      })
      .addFields({
        name: "Server",
        value: `[Sakura Tree](https://discord.gg/a628r44pM7)`,
        inline: true,
      })
      .addFields({
        name: "Discord.js Version",
        value: "`14.7.1`",
        inline: true,
      })
      .setTimestamp()
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
