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
    .setName("suerte")
    .setDescription("Evalua la suerte de una persona")
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
    const file = new AttachmentBuilder("Images/trebol.png", {
      name: `trebol.png`,
    });
    const Target = interaction.options.getUser("user") || interaction.user;
    let random = Math.floor(Math.random() * 100);
    let nota;
    if (random >= 1 && random <= 25) {
      nota =
        "Con esa suerte no saldría de casa <:emojicrying:1078356659732238466>";
    } else if (random <= 50 && random >= 26) {
      nota = "No está tan mal <:sharkblanketcry:1078731389760979054>";
    } else if (random <= 75 && random >= 51) {
      nota =
        "Ojoo, quizás hoy es tu día de suerte! <:woahsunglassesblush:1078356656250957875>";
    } else if (random <= 99 && random >= 76) {
      nota = "¿Deberías de echar loteria? <:huh:1078356658524278784>";
    } else if (random == 0) {
      nota =
        "A veces es mejor pasar al siguien día <:sadness:1097984046182699078>";
    } else if (random == 100) {
      nota = "¡Ves a tirar loteria YA!  <:gigachad:1078733389869359276>";
    } else {
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando Suerte`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Qué suerte tiene ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Porcentaje`,
        value: `> ${
          Target || interaction.member
        } tiene **${random}%** suerte <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail("attachment://trebol.png")
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
