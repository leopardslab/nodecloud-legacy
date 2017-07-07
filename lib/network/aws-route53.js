const helpers = require('../core/helpers');
const checkParams = helpers.checkParams;

class Route53 {
  /**
   * Route53 constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._elb = new this._AWS.Route53({ apiVersion: this._apiVersion });
    } else {
      this._elb = new this._AWS.Route53();
    }
  }
}

module.exports = Route53;
