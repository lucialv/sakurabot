const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildPresences } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.guildConfig = new Collection();
let actividad_previa;

client.on("ready", () => {
  const users = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
  let status = [
    {
      name: `Sakura with ${users} users!`,
      type: ActivityType.Playing,
    },
    {
      name: "/help",
      type: ActivityType.Watching,
    },
    {
      name: `${client.guilds.cache.size} Servers!`,
      type: ActivityType.Watching,
    },
  ];
  client.user.setActivity(status[1]);
  actividad_previa = status[1];

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);

    while (status[random] === actividad_previa) {
      random = Math.floor(Math.random() * status.length);
    }

    client.user.setActivity(status[random]);
    actividad_previa = status[random];
  }, 120000);
});

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(client.config.DatabaseURL, {})
  .then(() => console.log("The client is now connected to the database."));

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);

const { loadConfig } = require("./Functions/configLoader");
loadConfig(client);

client.login(client.config.token);
