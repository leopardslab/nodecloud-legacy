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
  /**
   * Create item
   * @createItem
   * @param {object} params
   */
  createItem(params) {
    checkParams(params);

    // create an item
    return new Promise((reject, resolve) => {
      this._dynamodb.putItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Delete item
   * @deleteItem
   * @param {object} params
   */
  deleteItem(params) {
    checkParams(params);

    // delete an item
    return new Promise((reject, resolve) => {
      this._dynamodb.deleteItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Update item
   * @updateItem
   * @param {object} params
   */
  updateItem(params) {
    checkParams(params);

    // update an item
    return new Promise((reject, resolve) => {
      this._dynamodb.updateItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Query
   * @query
   * @param {object} params
   */
  query(params) {
    checkParams(params);

    // run query
    return new Promise((reject, resolve) => {
      this._dynamodb.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = DynamoDB;
