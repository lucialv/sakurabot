const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
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
    const Target = interaction.options.getUser("user");
    let random = Math.floor(Math.random() * 30);
    if (
      (interaction.member.id == 997571433280577656 && !Target) ||
      (Target && Target.id == 997571433280577656)
    ) {
      random = 0;
    }
    if (
      (interaction.member.id == 1019405569385312297 && !Target) ||
      (Target && Target.id == 1019405569385312297)
    ) {
      random = 1;
    }
    if (Target && Target.id == 1060206122620960768) {
      random = 78;
    }

    if (random >= 1 && random <= 9) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, tranqui, el tamaño no importa <:emojicrying:1078356659732238466> `
        )
        .setColor("#ff0000")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random <= 19 && random >= 10) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, no está mal <:woahsunglassesblush:1078356656250957875>`
        )
        .setColor("#ffffb3")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
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
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, ¿no será una chica?`
        )
        .setColor("#f2c3ff")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 30) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, DIOOOSSS <:huh:1078356658524278784>`
        )
        .setColor("#ffffb3")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    } else if (random == 78) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `Soy un bot, no me puedo medir el pito <:ghostHeart:1097558572872765480>`
        )
        .setColor("#cc96c1")
        .setTimestamp(Date.now())
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
        .setDescription(
          `A ${
            Target || interaction.member
          } le mide: \n\n **${random}** cm, vaya titán <:huh:1078356658524278784>`
        )
        .setColor("#a6ffbe")
        .setTimestamp(Date.now())
        .setThumbnail(
          "https://images.vexels.com/media/users/3/230811/isolated/preview/752f6ac978c2ce839303371eaa383478-dibujos-animados-de-platano-a-medio-pelar.png"
        )
        .setFooter({
          text: `Solicitado por: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await interaction.reply({ embeds: [embed] });
    }
  },
};
