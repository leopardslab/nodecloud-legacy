const helpers = require("../core/helpers");
const checkParams = helpers.checkParams;

class GCPStorage {
  /**
   * GCPStorage constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._gce = new this._google.compute(this._google._config);
  }
}

module.exports = GCPStorage;
