const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
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
    const Target = interaction.options.getUser("user");
    let random = Math.floor(Math.random() * 100);
    // esto hará que cuando el usuario con esa id use el comando sea el valor de dentro
    if (random >= 1 && random <= 25) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, con esa suerte no saldría de casa <:emojicrying:1078356659732238466> `
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 50 && random >= 26) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, no está tan mal  <:sharkblanketcry:1078731389760979054> `
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 75 && random >= 51) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, ojoo, quizás hoy es tu día de suerte! <:woahsunglassesblush:1078356656250957875> `
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 99 && random >= 76) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, deberías de hechar loteria? <:huh:1078356658524278784> `
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 0) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, a veces es mejor pasar al siguiente día <:sadness:1078733065679024170> `
        )
        .setColor("#000000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 100) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `${
            Target || interaction.member
          } tiene: \n\n **${random}** % suerte, ves a tirar loteria YA!  <:gigachad:1078733389869359276> `
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://cdn.pixabay.com/photo/2013/07/12/17/20/leaf-152047_960_720.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription("Algo ha ido mal")
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    }
  },
};
