const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Client,
  ButtonBuilder,
} = require("discord.js");

const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription("Discord bot manual."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const folderEmojis = {
      Fun: "1097524969589719070",
      Moderation: "1097524969589719070",
      Utils: "1097524969589719070",
      Developer: "1097524969589719070",
      // Input your folder name and emoji ID.
      // example. Admin: "123456789"
      // Where Admin is the folder name and 123456789 is the emoji ID.
      // You can add more of your folder names and emoji ID's like this...
      // Admin: "123456789",
      // Audio: "123456789",
    };

    const embedMsg = new EmbedBuilder()
      .setDescription(`Hi`) // Set your main embed description.
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setColor("#cc96c1"); // Set your embed color.

    let helpMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("helpMenu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Select a category") // Set your select menu place holder text. For example, "Select a category".
    );

    fs.readdirSync("./Commands/Public").forEach((command) => {
      // Add your Command folder destination. Remember, this destination is from index.
      helpMenu.components[0].addOptions({
        // So if your Command folder is in Source/Command, your destination will be
        label: `${command}`, // "./Source/Command"
        description: `Command list for ${command}.`,
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
      .setLabel("Home")
      .setStyle("Primary");

    const reportButton = new ButtonBuilder()
      .setCustomId("reportButton")
      .setLabel("Report")
      .setStyle("Primary");

    const inviteButton = new ButtonBuilder()
      .setCustomId("inviteButton")
      .setLabel("Invite")
      .setStyle("Primary");

    const deleteButton = new ButtonBuilder()
      .setCustomId("deleteButton")
      .setLabel("Delete")
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
              homeButton,
              reportButton,
              inviteButton,
              deleteButton
            ),
          ],
        });
      } else if (interaction.customId === "reportButton") {
        const reportEmbed = new EmbedBuilder()
          .setDescription(
            `Direct message **evoke** if you would like to report any errors or bugs. The developer will reach back to you as soon as possible.`
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setColor(0x2b2d31);

        interaction.update({
          embeds: [reportEmbed],
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
      } else if (interaction.customId === "inviteButton") {
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=1084328077447929907&permissions=8&scope=bot`;

        const inviteEmbed = new EmbedBuilder()
          .setDescription(
            `Use the link below to invite me to your server. I do require **Administration** permission for better functionality. However, you can set my permissions as you want.` +
              `\n\nClick [here](${inviteLink}) to invite.`
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setColor(0x2b2d31);

        interaction.update({
          embeds: [inviteEmbed],
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

// Below is the event file for the /help command. Make a new file in your Event folder and paste it there.
// You can paste it in your event file too but it's all based on how your package is set up.
// I left all the file as it is, edit to your liking.
