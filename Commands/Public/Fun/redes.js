const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("redes")
    .setDescription("¡Publicita la red que quieras!")
    .addStringOption((option) =>
      option
        .setName("red")
        .setDescription("Escoge la red social que quieres publicitar")
        .setRequired(true)
        .addChoices(
          { name: "Instagram", value: "instagram" },
          { name: "Tiktok", value: "tiktok" },
          { name: "Twitter", value: "twitter" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription(
          "Dime tu nombre de usuario de la red escogida. (Pon bien las mayúsculas o minusculas)"
        )
        .setRequired(true)
        .setMaxLength(30)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const red_social = interaction.options.getString("red");
    const nombre_de_usuario = interaction.options.getString("user");
    interaction.editreply({
      content: `${red_social}: \nUser: ${nombre_de_usuario} \nDiscord Tag: ${interaction.user.tag}`,
    });
  },
};
