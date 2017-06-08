const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const ec2 = ncAWS.EBS(options);

describe('AWS EBS', () => {
  before(() => {});

  it('should not create EBS image', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {};

    ebs
      .create(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });

  it('should create EBS snapshot', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      Description: 'This is my root volume snapshot.',
      VolumeId: 'vol-1234567890abcdef0',
    };

    ebs
      .createSnapshot(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });

  it('should delete EBS snapshot', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      SnapshotId: 'snap-1234567890abcdef0',
    };

    ebs
      .createSnapshot(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });

  it('should describe EBS snapshot', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      SnapshotIds: ['snap-1234567890abcdef0'],
    };

    ebs
      .describeSnapshots(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });

  it('should describe EBS volume', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      Attribute: 'autoEnableIO',
      VolumeId: 'vol-049df61146c4d7901',
    };

    ebs
      .describeVolume(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });

  it('should describe multiple EBS volumes', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {};

    ebs
      .describeVolumes(params)
      .then((res) => {
        console.log(`All done ! ${res}`);
      })
      .catch((err) => {
        console.error(`Oops something happened ${err}`);
      });
  });
});
