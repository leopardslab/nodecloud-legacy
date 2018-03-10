class Lambda {

  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._lambda = new this._AWS.Lambda({ apiVersion: this._apiVersion });
  }

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
