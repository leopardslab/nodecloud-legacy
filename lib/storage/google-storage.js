const helpers = require('../core/helpers');
const checkParams = helpers.checkParams;

class GCStorage {
  /**
   * GCStorage constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   * @param string bucketName
   */
  constructor(google, config, bucketName) {
    this._google = google;
    this._gcs = new this._google.storage(this._google._config);
    if(bucketName) {
      return this._gcs.bucket(bucketName);
    }
  }
  /**
   * Create GCloud bucket
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);

    return this.gcs.createBucket(params.bucketName, params.metData);
  }
  /**
   * Delete GCP Bucket
   * @delete
   * @param {object} params
   */
  delete() {
    return bucket.delete();
  }
  /**
   * List buckets
   * @list
   * @param {object} params
   */
  list(params) {
    checkParams(params);

    return this._gcs.getBuckets();
  }
  /**
   * Upload to GCP
   * @upload
   * @param {object} bucket
   * @param {object} params
   */
  upload(bucket, params) {
    checkParams(params);

    return bucket.upload(params.contentPath, params.options);
  }
}

module.exports = GCStorage;
