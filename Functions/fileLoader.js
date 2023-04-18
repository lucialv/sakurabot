const { glob } = require("glob");
const path = require("path");
// const { promisify } = require("util");
// const proGlob = promisify(glob);

async function deleteCachedFile(file) {
  const filePath = path.resolve(file);
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }
}

async function loadFiles(dirName) {
  try {
    const files = await glob(
      path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/")
    );
    const jsFiles = files.filter((file) => path.extname(file) === ".js");
    await Promise.all(jsFiles.map(deleteCachedFile));
    return jsFiles;
  } catch (error) {
    console.error(`Error loading files from directory ${dirName}: ${error}`);
    throw error;
  }
}

module.exports = { loadFiles };
// async function loadFiles(dirName) {
//   const Files = await proGlob(
//     `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
//   );
//   Files.forEach((file) => delete require.cache[require.resolve(file)]);
//   return Files;
// }

//
