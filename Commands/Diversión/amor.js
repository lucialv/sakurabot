const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("amor")
    .setDescription("¿Cuanto amor hay entre tú y otra persona?")
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Usuario a evaluar.")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const target = interaction.options.getUser("user");
    let random = `${Math.floor(Math.random() * 100)}%`;
    if (
      (interaction.member.id == 702929806848819320 &&
        target.id == 997571433280577656) ||
      (interaction.member.id == 997571433280577656 &&
        target.id == 702929806848819320) ||
      interaction.member.id == target.id
    ) {
      random = `100%`;
    }
    let corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    if (random >= 1 && random <= 25) {
      corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    } else if (random <= 50 && random >= 26) {
      corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    } else if (random <= 75 && random >= 51) {
      corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    } else if (random <= 99 && random >= 76) {
      corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    } else {
      corazon_porcentaje = "https://i.imgur.com/p41nHim.png";
    }
    const canvas = Canvas.createCanvas(1200, 400);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(`${corazon_porcentaje}`);
    let myAvatar = interaction.member.displayAvatarURL({ extension: "png" });
    myAvatar = await Canvas.loadImage(myAvatar);
    let mentionAvatar = target.displayAvatarURL({ extension: "png" });
    mentionAvatar = await Canvas.loadImage(mentionAvatar);
    //dibujar el fondo
    ctx.save();
    ctx.filter = "blur(0px)";
    ctx.drawImage(background, 0, 0, 1200, 400);
    ctx.restore();
    ctx.globalAlpha = 0.5;
    ctx.fillRect(16, 16, 1, 1);
    ctx.globalAlpha = 1;
    //Dibujar logo del autor
    ctx.save();
    ctx.beginPath();
    const radius1 = 145;
    ctx.arc(200, 200, radius1, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(myAvatar, 45 + 10, 45 + 10, 290, 290);
    ctx.restore();

    //Dibujar logo del usuario mencionado
    ctx.save();
    ctx.beginPath();
    const radius2 = 145;
    ctx.arc(1000, 200, radius2, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(mentionAvatar, 845 + 10, 45 + 10, 290, 290);
    ctx.restore();

    //Dibujar corazón
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "80px Arial";
    ctx.fillText(random, 600, 200);

    const file = new AttachmentBuilder(await canvas.encode("png"), {
      name: "p41nHim.png",
    });

    interaction.editReply({ files: [file] });
  },
};
