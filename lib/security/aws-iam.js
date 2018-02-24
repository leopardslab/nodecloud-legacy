class IAM {
	/**
	* IAM constructor
	* @constructor
	* @param {object} aws - AWS SDK
	* @param {object} options - {apiVersion}
	*/

	constructor(aws, options) {
		this._AWS = aws;
		this._apiVersion = options.apiVersion;
		this.iam = new this._AWS.IAM({ apiVersion: this._apiVersion });
	}
	/**
   * Create IAM Group
   * @create
   * @param {object} params
   */
   createGroup(params) {
   	// Create a new IAM Group
   	return new Promise((resolve, reject) => {
   		if (!params) reject(new Error('Provide params to create IAM Group'));

   		this._iam.createGroup(params, (err, data) => {
   			if (err) {
   				reject(err);
   			} else {
   				resolve(data);
   			}
   		});
   	});
   }
}

module.exports = IAM