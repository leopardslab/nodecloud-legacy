const msRestAzure = require('ms-rest-azure');
const SQL = require('../../database/azure-sql')

class Azure {
  /**
  * Expose Azure APIs
  * @constructor
  */

  constructor() {
    this._azureRestSdk = msRestAzure;

    if (
      !process.env.AZURE_TENANT_ID ||
      !process.env.AZURE_CLIENT_ID ||
      !process.env.AZURE_CLIENT_SECRET ||
      !process.env.AZURE_SUBSCRIPTION_ID
    ) {
      throw new Error('Provide credentials');
    }
    return {
      getRestSdk: () => this._azureRestSdk,
      sql: this.SQL,
    }
  }

  /**
  * SQLManagement wrapper
  * @SQLManagement
  */
  SQL() {
    return new SQL(this.getRestSdk());
  }
}

module.exports = Azure
