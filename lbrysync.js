const program = require("commander");
const fs = require("fs");
const Syncer = require("./lib/syncer");
program
  .version("0.0.1")
  .option(
    "-i, --input <value>",
    "The path to the file with the information on what to sync."
  )
  // .option("-d, --debug", "Log everything to console and log file")

  .parse(process.argv);

program.on("--help", function() {
  console.log("  Example:");
  console.log("");
  console.log('    $ lbrysync -i "Path to file"');
  // console.log('    $ lbrysync -d -i "Path to file"');
  console.log("");
});
if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}
let syncer = new Syncer();
syncer.sync(program.input);
