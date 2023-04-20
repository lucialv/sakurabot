const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Client,
  AttachmentBuilder,
  ButtonBuilder,
} = require("discord.js");

const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("¡Muestra los comandos disponibles del bot!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const folderEmojis = {
      Diversión: "1097980889729863801",
      Moderación: "1097524751594954792",
      Utilidad: "1097524969589719070",
      Developer: "1097524725464432750",
      // Input your folder name and emoji ID.
      // example. Admin: "123456789"
      // Where Admin is the folder name and 123456789 is the emoji ID.
      // You can add more of your folder names and emoji ID's like this...
      // Admin: "123456789",
      // Audio: "123456789",
    };
    const embedMsg = new EmbedBuilder()
      .setAuthor({
        name: `Comando Help`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setFooter({
        text: `Solicitado por: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setDescription(
        "Esta es mi lista de comandos por ahora <:ghostHeart:1097558572872765480>"
      ) // Set your main embed description.
      .setImage("https://i.imgur.com/aPly5sy.png")
      .setColor("#cc96c1"); // Set your embed color.

    let helpMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("helpMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Select a category") // Set your select menu place holder text. For example, "Select a category".
    );

    fs.readdirSync("./Commands").forEach((command) => {
      // Add your Command folder destination. Remember, this destination is from index.
      helpMenu.components[0].addOptions({
        // So if your Command folder is in Source/Command, your destination will be
        label: `${command}`, // "./Source/Command"
        description: `Lista de comandos para ${command}.`,
        value: `${command}`,
        emoji: folderEmojis[command]
          ? { id: folderEmojis[command], name: "" } // Leave this as it is.
          : null,
      });
    });

    // Edit all these buttons to your liking.
    // I left the texts as they are mine to give you a better understanding of how these will work.
    // Read all the code from here till the end.

    const homeButton = new ButtonBuilder()
      .setCustomId("homeButton")
      .setLabel("Inicio")
      .setStyle("Primary");

    const reportButton = new ButtonBuilder()
      .setCustomId("reportButton")
      .setLabel("Reportar")
      .setStyle("Primary");

    const inviteButton = new ButtonBuilder()
      .setCustomId("inviteButton")
      .setLabel("Invitar")
      .setStyle("Secondary");

    const deleteButton = new ButtonBuilder()
      .setCustomId("deleteButton")
      .setLabel("✘")
      .setStyle("Danger");

    interaction.reply({
      embeds: [embedMsg],
      components: [
        helpMenu,
        new ActionRowBuilder().addComponents(
          homeButton,
          reportButton,
          inviteButton,
          deleteButton
        ),
      ],
    });

    const filter = (interaction) => interaction.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 300000, // The time when you want the buttons to be disabled. In my example, 300000 is equal to 5 minutes.
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "homeButton") {
        interaction.update({
          embeds: [embedMsg],
          components: [
            helpMenu,
            new ActionRowBuilder().addComponents(
              homeButton.setDisabled(false),
              reportButton.setDisabled(false),
              inviteButton.setDisabled(false),
              deleteButton
            ),
          ],
        });
      } else if (interaction.customId === "reportButton") {
        const reportEmbed = new EmbedBuilder()
          .setDescription(
            `¡**DM** <@997571433280577656> si quieres reportar algún bug!`
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setColor("#cc96c1");

        interaction.update({
          embeds: [reportEmbed],
          components: [
            helpMenu,
            new ActionRowBuilder().addComponents(
              homeButton.setDisabled(false),
              reportButton.setDisabled(true),
              inviteButton.setDisabled(false),
              deleteButton
            ),
          ],
        });
      } else if (interaction.customId === "inviteButton") {
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=1060206122620960768&permissions=8&scope=bot`;

        const inviteEmbed = new EmbedBuilder()
          .setDescription(
            `Utiliza el siguiente enlace para invitarme a su servidor. Necesito permiso de **Administrador** para una mejor funcionalidad. Sin embargo, puede configurar mis permisos como desee.` +
              `\n\nClick [aquí](${inviteLink}) para invitar`
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setColor("#cc96c1");

        interaction.update({
          embeds: [inviteEmbed],
          components: [
            helpMenu,
            new ActionRowBuilder().addComponents(
              homeButton,
              reportButton.setDisabled(false),
              inviteButton.setDisabled(true),
              deleteButton
            ),
          ],
        });
      } else if (interaction.customId === "deleteButton") {
        await interaction.channel.messages.delete(interaction.message.id);
      }
    });

    collector.on("end", async (collected) => {
      interaction.editReply({
        embeds: [embedMsg],
        components: [helpMenu],
      });
    });
  },
};
