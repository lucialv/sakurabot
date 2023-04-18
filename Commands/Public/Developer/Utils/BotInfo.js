const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  Discord,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("¡Te da información acerca del bot!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor("#a6ffbe")
      .setTitle("Bot Info")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(
        "https://cdn.discordapp.com/emojis/726893195052711948.gif?size=40"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1057344339719753748/1077207254459228180/ab.png"
      )
      .setDescription("Información útil del bot.")
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
        value: `[Shark ESP](https://discord.gg/FqgAkFVZ8j)`,
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

    await interaction.reply({ embeds: [embed] });
  },
};
