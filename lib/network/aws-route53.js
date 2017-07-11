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
      this._route53 = new this._AWS.Route53({ apiVersion: this._apiVersion });
    } else {
      this._route53 = new this._AWS.Route53();
    }
  }
  /**
   * Create new public hosted zone
   * @createZone
   * @param {object} params
   */
  createZone(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._route53.createHostedZone(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Delete zone
   * @deleteZone
   * @param {object} params
   */
  deleteZone(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._route53.deleteHostedZone(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * List zones
   * @listZones
   * @param {object} params
   */
  listZones(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._route53.listHostedZone(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Route53;
