const helpers = require('../core/helpers');
const checkParams = helpers.checkParams;

class DynamoDB {
  /**
   * DynamoDB constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._dynamodDB = new this._AWS.DynamoDB({ apiVersion: this._apiVersion });
    } else {
      this._dynamodDB = new this._AWS.DynamoDB();
    }
  }
}

module.exports = DynamoDB;
