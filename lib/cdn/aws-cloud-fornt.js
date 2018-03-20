const helpers = require("../core/helpers");

const { checkParams } = helpers;

class CloudFront {
  /**
   * CloudFront constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._cloudFront = new this._AWS.CloudFront({
        apiVersion: this._apiVersion
      });
    } else {
      this._cloudFront = new this._AWS.CloudFront();
    }
  }
  /**
   * Create Cloud Distribution
   * @createDistribution
   * @param  {object} params
   */
  createDistribution(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.createDistribution(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * list Cloud Distributions
   * @listDistributions
   * @param  {object} params
   */
  listDistributions(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.listDistributions(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * delete Cloud Distribution
   * @deleteDistribution
   * @param  {object} params
   */
  deleteDistribution(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.deleteDistribution(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * update Cloud Distribution
   * @updateDistribution
   * @param  {object} params
   */
  updateDistribution(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.updateDistribution(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * create Cloud Invalidation
   * @createInvalidation
   * @param  {object} params
   */
  createInvalidation(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.createInvalidation(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * list Cloud Invalidation
   * @listInvalidations
   * @param  {object} params
   */
  listInvalidations(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._cloudFront.listInvalidations(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = CloudFront;