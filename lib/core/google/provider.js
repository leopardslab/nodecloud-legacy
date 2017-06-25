const googleSDK = require("google-cloud");
const googleCompute = require("../../compute/google");
const googleStorage = require("../../storage/google-compute");

class Google {
  /**
   * Expose GCP/Google APIs
   * @constructor
   */
  constructor(config) {
    this._googleSDK = googleSDK;
    this._googleSDK._config = config;

    if (!config.projectId && config.keyFilename) {
      throw new Error('Provide parameters <link to docs> i.e: projectId, keyFilename');
    }

    return {
      getSDK: () => this._googleSDK,
      compute: this.googleCompute,
      storage: this.googleStorage
    };
  }
  /**
   * GCP compute Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleCompute(params) {
    return new googleCompute(this.getSDK(), this._config);
  }
  /**
   * GCP storage Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleStorage(params) {
    return new googleStorage(this.getSDK(), this._config);
  }
}

module.exports = Google;
