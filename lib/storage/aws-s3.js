const helpers = require("../core/helpers");
const checkParams = helpers.checkParams;

class S3 {
  /**
   * EBS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      this._s3 = new AWS.S3({ apiVersion: this._apiVersion });
    } else {
      this._s3 = new AWS.S3();
    }
  }
  /**
   * Create S3 Bucket
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._s3.createBucket(params, function(err, data) {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = S3;
