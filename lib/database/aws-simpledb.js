const helpers = require('../core/helpers');

const { checkParams } = helpers;
class SimpleDB {

	/**
	 * SimpleDB constructor
	 * @constructor
	 * @param {object} aws - AWS SDK
	 * @param {object} options - { apiVersion } 
	 */
	constructor(aws, options) {
		this._AWS = aws;
		if (options) {
	      this._apiVersion = options.apiVersion;
	      this._simpledb = new this._AWS.SimpleDB({ apiVersion: this._apiVersion });
	    } else {
	      this._simpledb = new this._AWS.SimpleDB();
	    }
	}

	/**
	 * Create Domain
	 * @createDomain
	 * @param {object} params
	 */
	createDomain(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.createDomain(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Delete item
	 * @deleteDomain
	 * @param {object} params
	 */
	deleteDomain(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.deleteDomain(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Create item
	 * @createItem
	 * @param {object} params
	 */
	createItem(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.putAttributes(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Update item
	 * @updateItem
	 * @param {object} params
	 */
	updateItem(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.putAttributes(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Delete item
	 * @deleteItem
	 * @param {object} params
	 */
	deleteItem(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.deleteAttributes(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * Query
	 * @query
	 * @param {object} params
	 */
	query(params) {
		checkParams(params);

		return new Promise((resolve, reject) => {
			this._simpledb.getAttributes(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
}

module.exports = SimpleDB;