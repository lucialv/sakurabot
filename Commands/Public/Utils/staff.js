const {
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");
const staffschema = require("../../../Schemas/staffrole");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("staff-help")
    .setDescription("Ping for help!"),
  async execute(interaction) {
    const staffdata = await staffschema.findOne({
      Guild: interaction.guild.id,
    });

    if (!staffdata) {
      return await interaction.reply({
        content: `This **feature** has not been **set up** in this server yet!`,
        ephemeral: true,
      });
    } else {
      const staffembed = new EmbedBuilder()
        .setColor("Purple")
        .setTimestamp()
        .setTitle("> Pinged some staff")
        .setDescription("You will be assisted shortly!");

      const staffrole = staffdata.Role;
      const memberslist = await interaction.guild.roles.cache
        .get(staffrole)
        .members.filter((member) => member.presence.status !== "offline")
        .map((m) => m.user)
        .join("\n> ");
      await interaction.reply({
        content: `${memberslist} <@&${staffrole}>`,
        embeds: [staffembed],
      });
    }
  },
};
