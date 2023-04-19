const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("camello")
    .setDescription("Evalua ela cantidad de camellos que vale una persona")
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
      nota = "Tus padres no tuvieron suerte <:emojicrying:1097983929241321664>";
    } else if (random <= 50 && random >= 26) {
      nota =
        "Hay muchos peces en el mar <:sharkblanketcry:1097984061856813076>";
    } else if (random <= 75 && random >= 51) {
      nota = "No estás nada mal <:woahsunglassesblush:1097983972828528641>";
    } else if (random <= 99 && random >= 76) {
      nota = "¿En tu casa o en la mía? <:huh:1097983950485467246>";
    } else if (random == 0) {
      nota =
        "Mi madre diría lávate la boca con jabón, tú mejor lavate la cara <:sadness:1097984046182699078>";
    } else if (random == 100) {
      nota =
        "Ojalá fueras un armario para empotrarte contra la pared <:ghostHeart:1097558572872765480>";
    } else {
      nota = "Quizás ha habido un error";
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando camello`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Cuántos camellos vale ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Cantidad`,
        value: `> ${
          Target || interaction.member
        } vale **${random}** camellos <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail(
        "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f42b.png"
      )
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  },
};
