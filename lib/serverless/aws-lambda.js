class Lambda {
  /**
   * Lambda Constructor
   * @constructor
   * @param {object} aws - AWS sdk
   * @param {object} option - {apiVersion}
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._lambda = new this._AWS.Lambda({ apiVersion: this._apiVersion });
  }

  /**
   * Create Function
   * @create
   * @param {object} params
   */
  createFunction(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to create lambda function'));

      this._lambda.createFunction(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete Function
   * @delete
   * @param {object} params
   */
  deleteFunction(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to delete lambda functions'));

      this._lambda.deleteFunction(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Invoke Function
   * @invoke
   * @param {object} params
   */
  invokeFunction(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to invoke lambda function'));

      this._lambda.invoke(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * List Functions
   * @list
   * @param {object} params
   */
  listFunctions(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error('Provide params to list functions'));

      this._lambda.listFunctions(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Lambda;
