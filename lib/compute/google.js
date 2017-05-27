class GoogleCompute {
  /**
   * GoogleCompute constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._gce = new this._google.compute(config);
  }
  /**
   * Create Google VM
   * @create
   * @param {object} params
   * @param {object} instanceParams
   */
  create(params) {
    // Create zone
    const zone = this._gce.zone(params.zone);
    const name = params.zoneOs;

    //create GCP VM
    return new Promise((resolve, reject) => {
      this._google.createVM(name, { os: params.zone }, function(
        err,
        vm,
        operation
      ) {
        operation
          .on("error", function(err) {
            reject(err);
          })
          .on("running", function(metadata) {
            resolve(metadata);
          })
          .on("complete", function(metadata) {
            resolve(metadata);
          });
      });
    });
  }
}

module.exports = GoogleCompute;
