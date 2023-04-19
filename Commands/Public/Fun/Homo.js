const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("homo")
    .setDescription("Dice que tan homoexual es una persona")
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
        "¡No hay nada de malo en ser un poquito homo! ¡Sigue siendo tú mismo!";
    } else if (random <= 50 && random >= 26) {
      nota =
        "¡Eres una persona increíblemente diversa y eso es genial! ¡Abraza tu lado homo!";
    } else if (random <= 75 && random >= 51) {
      nota =
        "¡Eres una persona diversa y eso es genial! Explora tus intereses y sé feliz con lo que te hace feliz. No te preocupes por lo que piensen los demás, solo haz lo que te haga feliz";
    } else if (random <= 99 && random >= 76) {
      nota =
        "¡Vamos, tú eres la fiesta! ¡Demuestra al mundo tu orgullo y sé quien eres!";
    } else if (random == 0) {
      nota =
        "¡No pasa nada! La orientación sexual es una parte de ti, pero no te define como persona. ¡Eres genial tal y como eres!";
    } else if (random == 100) {
      nota =
        "¡Increíble! Eres una persona única y especial. ¡Sigue siendo tú mismo y nunca dejes que nadie te diga lo contrario!";
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Comando homo`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(
        `<:flecha:1097547930237407242>¿Qué tan homoexual es ${Target.username}? <:SagiriShy:1097980889729863801> `
      )
      .addFields({
        name: `• Porcentaje`,
        value: `> ${
          Target || interaction.member
        } es **${random}%** homo <a:HeartsBubblePink:1097980344818470985>  `,
      })
      .addFields({
        name: `• Nota`,
        value: `> ${nota}`,
      })
      .setColor("#cc96c1")
      .setTimestamp(Date.now())
      .setThumbnail(
        "https://www.experimenta.es/wp-content/uploads/2019/06/40-aniversario-de-la-bandera-del-orgullo-gay-la-historia-de-su-diseno.jpg"
      )
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  },
};
