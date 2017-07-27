const helpers = require('../core/helpers');
const checkParams = helpers.checkParams;

class RDS {
  /**
   * RDS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._rds = new this._AWS.RDS({ apiVersion: this._apiVersion });
    } else {
      this._rds = new this._AWS.RDS();
    }
  }
}

module.exports = RDS;
