const helpers = require("../core/helpers");
const checkParams = helpers.checkParams;

class GCPComputeStorage {
  /**
   * GCPStorage constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._gce = new this._google.storage(this._google._config);
  }
  /**
   * Create a persistent disk
   * @list
   * @param {object} params
   */
  create(params) {
    checkParams(params);

    return disk.create(params);
  }
}

module.exports = GCPComputeStorage;
