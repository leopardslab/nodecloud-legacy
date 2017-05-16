const fs = require("fs");
const os = require("os");
const path = require("path");
const providers = require("../providers");

const Config = function() {
  this._homeDir = os.homedir();
};

Config.prototype.readConfig = function(provider) {
  if (provider === providers.AWS) {
    return this.parseAWS();
  }
};

Config.prototype.parseAWS = function() {
  const awsCredentials = fs
    .readFileSync(`${this._homeDir}/.aws/credentials`)
    .toString();
  const lines = awsCredentials.split("\n");
  this.keyIdAWS = false;
  this.keySecretAWS = false;

  lines.map(line => {
    if (line.startsWith("aws_access_key_id")) {
      this.keyIdAWS = line.split("=")[1].trim();
    }
    if (line.startsWith("aws_secret_access_key")) {
      this.keySecretAWS = line.split("=")[1].trim();
    }
  });

  if (!this.keyIdAWS || !this.keySecretAWS) {
    return false;
  }

  return {
    aws_access_key_id: this.keyIdAWS,
    aws_secret_access_key: this.keySecretAWS
  };
};

Config.prototype.parseGoogle = function(argument) {
  console.log("Google creds");
};

Config.prototype.checkConfig = function(provider) {
  this._provider = provider;
  conf = this.readConfig(this._provider);

  if (conf.aws_access_key_id && conf.aws_secret_access_key) {
    return conf;
  }

  return false;
};

module.exports = Config;
