const lbry = require("lbry-nodejs");
const config = require("config");
const fs = require("fs");
const util = require("util");
const hash = require("object-hash");
const Logger = require("./logger");
const readFile = util.promisify(fs.readFile);
const logger = new Logger().logger;
const neatCsv = require("neat-csv");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const Queue = require("better-queue");
class Syncer {
  constructor(program) {
    this.log = logger.log;
    this.channels = [];
    this.program = program;
    this.db = low(adapter);
    this.db.defaults({ syncedItems: [], erroredItems: {} }).write();
    this.config = config.get("defaultSettings");
    this.log("info", "Booting up synctool...");
  }
  getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
  }
  async convert(input) {
    let conv;
    switch (input.constructor) {
      case Object:
        return input;

      case String:
        conv = await neatCsv(await readFile(input));
        return conv;
      default:
        throw new Error(
          "Wrong input type, the input data needs to be either a path or a object"
        );
    }
  }
  syncDone(result, i) {
    this.db
      .get("syncedItems")
      .push({
        itemHash: hash(i),
        title: i.title,
        claim_address: result.claim_address,
        claim_id: result.claim_id,
        txid: result.txid
      })
      .write();
    this.log("info", `Published "${i.title}" with success!`);
  }
  async syncFail(err, i) {
    this.db
      .get("notSyncedItems")
      .push({
        itemHash: hash(i),
        title: i.title,
        error: err.data.message
      })
      .write();
    this.log(
      "error",
      `Failed syncing "${i.title}" to the chain, error: ${err.data.message}`
    );
  }
  async sync(input) {
    try {
      await this.checkDaemon();
      this.channels = await this.getChannels();
      let convertedInput = await this.convert(input);
      const amtBefCheck = convertedInput.length;
      convertedInput = convertedInput.filter(i => {
        i = this.db
          .get("syncedItems")
          .find({ itemHash: hash(i) })
          .value();
        if (i == null) return true;
        return false;
      });
      this.log(
        "info",
        `Began syncing ${convertedInput.length} items, ${amtBefCheck -
          convertedInput.length} items already synced!`
      );
      await this.dosync(convertedInput);
    } catch (e) {
      this.log("error", `Got error while trying to sync: ${e.message}`);
    }
  }
  async dosync(arr) {
    for (const claimdata of arr) {
      let claim = await lbry.publish(
        claimdata.name,
        parseFloat(claimdata.bid) || this.config.standardBid,
        {
          file_path: claimdata.file_path,
          title: claimdata.title || null,
          description: claimdata.description || null,
          author:
            claimdata.author || this.config.standardAuthor || "LBRY Synctool",
          language: claimdata.lang || this.config.standardLang || "en",
          license: claimdata.license || this.config.standardLicense || null,
          license_url:
            claimdata.license_url || this.config.standardLicenseUrl || null,
          thumbnail:
            claimdata.thumbnail || this.config.standardThumbnail || null,
          nsfw:
            this.getBool(claimdata.nsfw) || this.config.standardNSFW || false,
          channel_name:
            claimdata.channel_name || this.config.standardChannelName || null,
          claim_address:
            claimdata.claim_address || this.config.standardClaimAddress || null
        }
      );
      if (claim.hasOwnProperty("error")) {
        this.syncFail(claim.error, claimdata);
      } else if (claim.hasOwnProperty("result")) {
        this.syncDone(claim.result, claimdata);
      }
    }
  }
  async checkDaemon() {
    const status = await lbry.status();
    if (status.result.is_running) return true;
    throw new Error("LBRY is not ready yet, please wait before trying again!");
  }
  async getChannels() {
    const { result } = await lbry.channel_list_mine();
    return result.filter(x => x.can_sign).map(x => x.name);
  }
}

module.exports = Syncer;
