const chai = require('chai');
const assert = chai.assert;
const config = require('../../lib/core/config');
const providers = require('../../lib/providers');

describe('Configuration', () => {
  it('should check for AWS configuration', (done) => {
    const conf = new config();
    const configAWS = conf.checkConfig(providers.AWS);

    assert.typeOf(configAWS, 'object');
    assert.typeOf(configAWS.aws_access_key_id, 'string');
    assert.typeOf(configAWS.aws_secret_access_key, 'string');
    done();
  });
});
