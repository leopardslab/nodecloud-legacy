const helpers = require("../core/helpers");
const checkParams = helpers.checkParams;

class EBS {
  /**
   * EBS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._ebs = new this._AWS.EBS({ apiVersion: this._apiVersion });
  }
  /**
   * Create EBS image
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);
    // Create EBS service object
    const ebs = this._ebs;
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      ec2.createImage(params, function(err, data) {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }
}
