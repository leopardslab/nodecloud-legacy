const providers = require("../providers");
const awsProvider = require("./aws/provider");

/**
 * Provider constructor
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function Provider(provider, configPath) {
  this._provider = this.getProvider(provider, configPath);
  return this._provider;
}

/**
 * Returns requested provider type
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
Provider.prototype.getProvider = function(provider, configPath) {
  if (provider === providers.AWS) {
    return new awsProvider(configPath);
  } else {
    throw new Error(
      "Unsupported provider: find all supported providers here <link to docs>"
    );
  }
};

module.exports = Provider;
