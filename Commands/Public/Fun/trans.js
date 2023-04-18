const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("trans")
    .setDescription("Dice que tan transexual es una persona")
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
    let random = Math.floor(Math.random() * 100);
    let nota;
    if (random >= 1 && random <= 25) {
      nota = "Creo que no es trans.";
    } else if (random <= 50 && random >= 26) {
      nota = "Quizás es un poco trans.";
    } else if (random <= 75 && random >= 51) {
      nota = "Creo que debería replantearselo.";
    } else if (random <= 99 && random >= 76) {
      nota =
        "Debería de ir a cambiarse el nombre al sexo contrario. <:huh:1097983950485467246>";
    } else if (random == 0) {
      nota = "No se por qué, pero creo que no es trans.";
    } else if (random == 100) {
      nota = "Dicen que viene con sorpresa.";
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando Trans`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Qué tan transexual es ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Porcentaje`,
        value: `> ${
          Target || interaction.member
        } es **${random}%** trans <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail(
        "https://images.reporteindigo.com/wp-content/uploads/2021/11/Bandera-del-orgullo-trans-%C2%BFcual-es-el-significado-de-sus-colores.jpg"
      )
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  },
};
