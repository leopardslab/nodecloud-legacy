const providers = require("../providers");
const awsProvider = require("./aws/provider");

function Provider(provider) {
  this._provider = this.getProvider(provider);
}

Provider.prototype.getProvider = function(provider) {
  if (provider === providers.AWS) {
    return new awsProvider();
  } else {
    throw new Error(
      "Unsupported provider: find all supported providers here <link to docs>"
    );
  }
};

module.exports = Provider;
