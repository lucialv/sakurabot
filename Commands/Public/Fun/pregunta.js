const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pregunta")
    .setDescription("Te responde a tu pregunta")
    .setDMPermission(true)
    .addStringOption((options) =>
      options
        .setName("pregunta")
        .setDescription("Dime la pregunta que quieres que te responda")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const file = new AttachmentBuilder("Images/question.png", {
      name: `question.png`,
    });
    const pregunta = interaction.options.getString("pregunta");
    let replies = [
      `Puede que si.`,
      `Puede que no.`,
      `Si.`,
      `Si.`,
      `Si.`,
      `No.`,
      `No.`,
      `No.`,
      `Tal vez.`,
      `Tal vez no.`,
      `Tal vez si.`,
      `Quizás...`,
      `Quizás no...`,
      `Nunca se sabe.`,
      `Definitivame si.`,
      `UwU`,
    ];
    let respuesta = Math.floor(Math.random() * replies.length);
    const embed = new EmbedBuilder()
      .setColor("#cc96c1")
      // .setDescription(
      //   `${interaction.member} me hace una pregunta <a:happy_girl_moving:1097577244441985064> \n\n<:flecha:1097547930237407242> Pregunta: **${pregunta}**\n\n<:flecha:1097547930237407242> Respuesta: **${replies[respuesta]}**`
      // )
      .setAuthor({
        name: `Comando pregunta`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242> ${Target.username}? Me hace una pregunta... <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Pregunta`,
        value: `> ${pregunta} <a:HeartsBubblePink:1097980344818470985>`,
      })
      .addFields({
        name: `• Respuesta`,
        value: `> ${replies[respuesta]}`,
      })
      .setThumbnail("attachment://question.png")
      .setTimestamp(Date.now())
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed], files: [file] });
  },
};
