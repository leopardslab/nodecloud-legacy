const providers = require('../providers');
const awsProvider = require('./aws/provider');
const googleProvider = require('./google/provider');
const azureProvider = require('./azure/provider');

class Provider {
  /**
   * Provider constructor
   * @constructor
   * @param {string} provider - Type of provider - can be found here '/aws/provider'
   */
  constructor(provider, configPath) {
    this._provider = this.getProvider(provider, configPath);
    return this._provider;
  }
  /**
   * Returns requested provider type
   * @param {string} provider - Type of provider - can be found here '/aws/provider'
   */
  getProvider(provider, configPath) {
    if (provider === providers.AWS) return new awsProvider(configPath);
    if (provider === providers.google) return new googleProvider(configPath);
    if (provider === providers.Azure) return new azureProvider();
    throw new Error('Unsupported provider: find all supported providers here <link to docs>');
  }
}

module.exports = Provider;
