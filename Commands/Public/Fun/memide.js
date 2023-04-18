const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("memide")
    .setDescription("Cuanto te mide?")
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Usuario a evaluar.")
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Target = interaction.options.getUser("user") || interaction.user;
    let random = Math.floor(Math.random() * 30);
    let nota;
    const file = new AttachmentBuilder("Images/banana.png", {
      name: `banana.png`,
    });
    if (Target.id == "997571433280577656") {
      random = Math.floor(Math.random() * 30);
      // random = 0;
    }
    if (random >= 1 && random <= 9) {
      nota = "Tranqui, el tamaño no importa <:emojicrying:1078356659732238466>";
    } else if (random <= 19 && random >= 10) {
      nota = "No está mal <:woahsunglassesblush:1078356656250957875>";
    } else if (random <= 29 && random >= 20) {
      nota = "Menuda locura <:huh:1097983950485467246>";
    } else if (random == 0) {
      nota = "¿No será una chica? <a:RainbowPls:1098012838905270293>";
    } else if (random == 30) {
      nota = "DIOOOSSS, TREMENDO TITÁN <:huh:1078356658524278784>";
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando MeMide`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Cuánto le mide a ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Longitud`,
        value: `> A ${
          Target || interaction.member
        } le mide **${random}** cm <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail("attachment://banana.png")
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
