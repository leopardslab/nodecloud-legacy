const googleSDK = require('google-cloud');
const GoogleCompute = require('../../compute/google');
const GoogleStorage = require('../../storage/google-compute');
const GoogleStorageBucket = require('../../storage/google-storage');
const GoogleDNS = require('../../network/google-dns');
const GoogleDatastore = require('../../database/google-datastore');

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
      storage: this.googleStorage,
      bucket: this.googleStorageBucket,
      dns: this.googleDNS,
      nosql: this.googleDatastore,
    };
  }
  /**
   * GCP compute Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleCompute(params) {
    return new GoogleCompute(this.getSDK(), this._config);
  }
  /**
   * GCP storage Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleStorage(params) {
    return new GoogleStorage(this.getSDK(), this._config);
  }
  /**
   * GCP storage bucket Wrapper
   * @googleStorageBucket
   * @param {object} params - { apiVersion }
   */
  googleStorageBucket(params) {
    if (params === undefined) {
      return new GoogleStorageBucket(this.getSDK(), this._config);
    }
    return new GoogleStorageBucket(this.getSDK(), this._config, params.bucketName);
  }
  /**
   * GCP DNS wrapper
   * @googleDNS
   * @param {object} params - { apiVersion }
   */
  googleDNS(params) {
    if (params === undefined) {
      return new GoogleDNS(this.getSDK(), this._config);
    }
    return new GoogleDNS(this.getSDK(), this._config);
  }
  /**
   * GCP Datastore wrapper
   * @googleDatastore
   * @param {object} params - { apiVersion }
   */
  googleDatastore(params) {
    return new GoogleDatastore(this.getSDK());
  }
}

module.exports = Google;
