const awsSDk = require("aws-sdk");
const EC2 = require("../../compute/aws-ec2");

/**
 * Expose AWS APIs
 * @constructor
 */
function AWS(configPath) {
  this._AWS = awsSDk;

  if (!this._AWS.config.credentials.accessKeyId) {
    if (configPath) {
      this._AWS.config.loadFromPath(configPath);
    } else {
      throw new Error("Provide credentials <find more>");
    }
  }

  return {
    getSDK: () => this._AWS,
    EC2: this.EC2
  };
}

/**
 * EC2 Wrapper
 * @EC2
 * @param {object} options - { apiVersion }
 */
AWS.prototype.EC2 = function(options) {
  this._apiVersion = options.apiVersion;
  return new EC2(this.getSDK(), this._apiVersion);
};

module.exports = AWS;
