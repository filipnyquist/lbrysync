const winston = require("winston");
const path = require("path");
const wcf = require("winston-console-formatter");
const wdrf = require("winston-daily-rotate-file");

const { formatter, timestamp } = wcf();

class SyncLogger {
  constructor(Syncer) {
    winston.clear();
    winston.add(winston.transports.Console, {
      level: "silly",
      formatter,
      timestamp
    });
    winston.add(wdrf, {
      filename: "lbrysync-%DATE%.log",
      dirname: "./logs",
      datePattern: "YYYY-MM-DD-HH",
      prepend: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "silly"
    });
  }

  get logger() {
    return winston;
  }
}

module.exports = SyncLogger;
