const baseProvider = require("./base-provider");

/**
 * Provider constructor
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function getProvider(provider) {
  return new baseProvider(provider);
}

module.exports = {
  getProvider: getProvider
};
