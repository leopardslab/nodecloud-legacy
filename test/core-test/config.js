const chai = require('chai');
const assert = chai.assert;

const config = require('../../lib/core/config');
const providers = require('../../lib/providers');

describe('Configuration', () => {
  it('should check for AWS configuration', (done) => {
    const configAWS = config.checkConfig(providers.AWS);

    assert.typeOf(configAWS.aws_access_key_id, 'string');
    assert.typeOf(configAWS.aws_secret_access_key, 'string');
    done();
  });
});
