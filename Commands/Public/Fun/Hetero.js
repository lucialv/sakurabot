const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("hetero")
    .setDescription("Dice que tan heteroexual es una persona")
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
      nota =
        "¡No te preocupes, es normal sentirse atraído por personas de distintos géneros! ¡Sigue siendo tú mismo!";
    } else if (random <= 50 && random >= 26) {
      nota =
        "¡Eres una persona increíblemente diversa y eso es genial! ¡Explora tus intereses y sé feliz con lo que te hace feliz!";
    } else if (random <= 75 && random >= 51) {
      nota =
        "¡Eres una persona diversa y eso es genial! Explora tus intereses y sé feliz con lo que te hace feliz. No te preocupes por lo que piensen los demás, solo haz lo que te haga feliz";
    } else if (random <= 99 && random >= 76) {
      nota =
        "¡Genial! Es maravilloso ser fiel a uno mismo y sentirse atraído por personas de géneros diferentes. ¡Sigue siendo tú mismo y sigue adelante!";
    } else if (random == 0) {
      nota =
        "¡No te preocupes! La orientación sexual es una parte de ti, pero no define quién eres como persona. ¡Sigue siendo increíble tal y como eres!";
    } else if (random == 100) {
      nota =
        "¡Fantástico! Eres una persona única y especial. ¡Sigue siendo fiel a ti mismo y nunca dejes que nadie te diga lo contrario!";
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando hetero`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Qué tan heteroexual es ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Porcentaje`,
        value: `> ${
          Target || interaction.member
        } es **${random}%** hetero <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Heterosexual_flag_%28black-grey-white%29.svg/2560px-Heterosexual_flag_%28black-grey-white%29.svg.png"
      )
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  },
};
