const { loadFiles } = require("../Functions/fileLoader");

async function loadEvents(client) {
  console.time("Events Loaded");

  client.events = new Map();
  const events = new Array();

  const files = await loadFiles("Events");

  for (const file of files) {
    try {
      const event = require(file);
      const execute = (...args) => event.execute(...args, client);
      const target = event.rest ? client.rest : client;

      target[event.once ? "once" : "on"](event.name, execute);
      client.events.set(event.name, execute);

      events.push({ Event: event.name, Status: "🧶" });
    } catch (error) {
      events.push({ Event: file.split("/").pop().slice(0, -3), Status: "❌" });
    }
  }

  console.table(events, ["Event", "Status"]);
  console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events.");
  console.timeEnd("Events Loaded");
}
module.exports = { loadEvents };
// async function loadEvents(client) {
//   const { loadFiles } = require("../Functions/fileLoader");
//   const ascii = require("ascii-table");
//   const table = new ascii().setHeading("Events", "Status");

//   await client.events.clear();

//   const Files = await loadFiles("Events");

//   Files.forEach((file) => {
//     const event = require(file);

//     const execute = (...args) => event.execute(...args, client);
//     client.events.set(event.name, execute);

//     if (event.rest) {
//       if (events.once) client.rest.once(event.name, execute);
//       else client.rest.on(event.name, execute);
//     } else {
//       if (event.once) client.once(event.name, execute);
//       else client.on(event.name, execute);
//     }

//     table.addRow(event.name, "🧶");
//   });

//   return console.log(table.toString(), "\nLoaded Events");
// }

// module.exports = { loadEvents };
