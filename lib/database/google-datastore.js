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
  /**
   * Create item
   * @createItem
   * @param {object} params
   */
  createItem(params) {
    const key = this._gcd.key([params.key]);
    const data = params.data;

       console.log(key);
    console.log(data);

    // create record / item
    return this._gcd.save({
      key,
      data,
    });
  }
  /**
   * Delete item
   * @deleteItem
   * @param {object} params
   */
  deleteItem(params) {
    const key = this._gcd.key([params.key]);
    const data = params.data;

    // delete record / item
    return this._gcd.delete(key);
  }
  /**
   * Update item
   * @updateItem
   * @param {object} params
   */
  updateItem(params) {
    const key = this._gcd.key([params.key]);
    const data = params.data;

    // update record / item
    return this._gcd.save({
      key,
      data,
    });
  }
}

module.exports = GCD;
