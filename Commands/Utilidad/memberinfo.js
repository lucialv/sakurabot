const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const { profileImage } = require("discord-arts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("memberinfo")
    .setDescription("Mira la inforamación de un usuario")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription(
          "Mira la información de un usuario. Dejalo en blanco para ver la tuya."
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply();
    const member =
      interaction.options.getMember("member") || interaction.member;

    if (member.user.bot)
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              "En este momento el bot no puede hacer este comando <a:6764_no:1097556585192112149> "
            )
            .setColor("#cc96c1"),
        ],
        ephemeral: true,
      });

    try {
      const fetchedMembers = await interaction.guild.members.fetch();
      const profileBuffer = await profileImage(member.id);
      const imageAttachment = new AttachmentBuilder(profileBuffer, {
        name: `profile.png`,
      });

      const joinPosition =
        Array.from(
          fetchedMembers
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .keys()
        ).indexOf(member.id) + 1;

      const topRoles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role)
        .slice(0, 3);

      const userBadges = member.user.flags.toArray();

      const joinTime = parseInt(member.joinedTimestamp / 1000);
      const createdTime = parseInt(member.user.createdTimestamp / 1000);

      const Booster = member.premiumSince
        ? "<:discordboost7:1097524727532236820>"
        : "<a:6764_no:1097556585192112149> ";
      const Embed = new EmbedBuilder()
        .setAuthor({
          name: `${member.user.tag} | Información General`,
          iconURL: member.displayAvatarURL(),
        })
        .setColor(member.displayColor)
        .setDescription(
          `En <t:${joinTime}:D>, ${
            member.user.username
          } se unió el **${addSuffix(joinPosition)}** en este servidor.`
        )
        .setImage("attachment://profile.png")
        .addFields([
          {
            name: "Medallas",
            value: `${addBadges(userBadges).join("")}`,
            inline: true,
          },
          { name: "Booster", value: `${Booster}`, inline: true },
          {
            name: "Top roles",
            value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`,
            inline: false,
          },
          { name: "Creado", value: `<t:${createdTime}:R>`, inline: true },
          { name: "Unido", value: `<t:${joinTime}:R>`, inline: true },
          { name: "ID", value: `${member.id}`, inline: false },
          {
            name: "Avatar",
            value: `[Link](${member.displayAvatarURL()})`,
            inline: true,
          },
          {
            name: "Banner",
            value: `[Link](${(await member.user.fetch()).bannerURL()})`,
            inline: true,
          },
        ]);

      interaction.editReply({ embeds: [Embed], files: [imageAttachment] });
    } catch (error) {
      interaction.editReply({
        content: "Ha ocurrido un error: Contacta con la desarolladora.",
      });
      throw error;
    }
  },
};
function addSuffix(number) {
  if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
  }
  return number + "th";
}

function addBadges(badgeNames) {
  if (!badgeNames.length) return ["<a:6764_no:1097556585192112149> "];
  const badgeMap = {
    ActiveDeveloper: "<:activedeveloper:1097524725464432750> ",
    BugHunterLevel1: "<:discordbughunter1:1097524730816372766>",
    BugHunterLevel2: "<:discordbughunter2:1097524732691230822>",
    PremiumEarlySupporter: "<:discordearlysupporter:1097524733853040710>",
    Partner: "<:discordpartner:1097524737833447476>",
    Staff: "<:discordstaff:1097524969589719070>",
    HypeSquadOnlineHouse1: "<:hypesquadbravery:1097524744720482395>", // bravery
    HypeSquadOnlineHouse2: "<:hypesquadbrilliance:1097524746490499132>", // brilliance
    HypeSquadOnlineHouse3: "<:hypesquadbalance:1097524742686244975>", // balance
    Hypesquad: "<:hypesquadevents:1097524971565228034>",
    CertifiedModerator: "<:olddiscordmod:1097524751594954792>",
    VerifiedDeveloper: "<:discordbotdev:1097524729201573958>",
  };

  return badgeNames.map((badgeName) => badgeMap[badgeName] || "❔");
}

//
// <:discordmod:1097524735065194716>
// <:discordnitro:1097524736101204108>
