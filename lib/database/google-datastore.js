const helpers = require('../core/helpers');
const checkParams = helpers.checkParams;

class GCD {
  /**
   * GCD constructor
   * @constructor
   * @param {object} google - google SDK
   */
  constructor(google) {
    this._google = google;
    this._gcd = new this._google.datastore(this._google._config);
  }
}

module.exports = GCD;
