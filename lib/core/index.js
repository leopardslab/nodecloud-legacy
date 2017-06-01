const baseProvider = require("./base-provider");
const awsEC2 = require('../compute/aws-ec2');

/**
 * Factory for getting providers
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function getProvider(provider, configPath) {
  return new baseProvider(provider, configPath);
}

module.exports = {
  getProvider: getProvider
};
