const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  AttachmentBuilder,
} = require("discord.js");
const Canvas = require("@napi-rs/canvas");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("redes")
    .setDescription("¡Publicita la red que quieras!")
    .addStringOption((option) =>
      option
        .setName("red")
        .setDescription("Escoge la red social que quieres publicitar")
        .setRequired(true)
        .addChoices(
          { name: "Instagram", value: "instagram" },
          { name: "Tiktok", value: "tiktok" },
          { name: "Twitter", value: "twitter" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription(
          "Dime tu nombre de usuario de la red escogida. (Pon bien las mayúsculas o minusculas)"
        )
        .setRequired(true)
        .setMaxLength(30)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const red_social = interaction.options.getString("red");
    const nombre_de_usuario = interaction.options.getString("user");
    let fondo = "https://i.imgur.com/y2XDHuy.png";
    let texto_user = `User: ${interaction.user.tag}`;
    const canvas = Canvas.createCanvas(1200, 400);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(`${fondo}`);
    let myAvatar = interaction.member.displayAvatarURL({ extension: "png" });
    myAvatar = await Canvas.loadImage(myAvatar);
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

    //Dibujar corazón
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "80px Arial";
    ctx.fillText(texto_user, 600, 200);
    let foto_red_social;
    if (red_social === "instagram"){
      foto_red_social = "https://1000marcas.net/wp-content/uploads/2019/11/Instagram-Logo.png";
    } else if (red_social === "tiktok") {
      foto_red_social = "https://static.vecteezy.com/system/resources/previews/018/930/463/original/tiktok-logo-tikok-icon-transparent-tikok-app-logo-free-png.png";
    } else if (red_social === "twitter") {
      foto_red_social = "https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png";
    }
    foto_red_social = await Canvas.loadImage(foto_red_social);
    const file = new AttachmentBuilder(await canvas.encode("png"), {
      name: "y2XDHuy.png",
    });
    interaction.reply({
      content: `${red_social}: \nUser: ${nombre_de_usuario} \nDiscord Tag: ${interaction.user.tag}`,
    });
  },
};
