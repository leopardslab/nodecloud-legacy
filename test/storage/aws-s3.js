const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const s3 = ncAWS.s3(options);

describe('AWS EBS', () => {
  before(() => {});

  it('should create S3 bucket', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      Bucket: 'ncbucketcr',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-west-2',
      },
    };

    s3.create(params).then((res) => {
      assert.equal(res.Location, `http.${params.Bucket}.s3.amazonaws.com`);
    });
  });

  it('should delete S3 bucket', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      Bucket: 'ncbucketcr',
    };

    s3
      .delete(params)
      .then((res) => {
        assert.equal(typeof(res), 'object');
      });
  });

  it('should create multipart upload', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = {
      Bucket: 'ncbucketcr',
      Key: 'largeobject',
    };

    s3
      .createMultipartUpload(params)
      .then((res) => {
        assert.equal(res.Bucket, 'ncbucketcr');
        assert.equal(res.Key, 'largeobject');
        assert.equal(typeof(res.UploadId), 'string');
      });
  });

  it('should list all buckets', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    s3
      .list({})
      .then((res) => {

      });
  });

  it('should upload an arbitary sized buffer, blob, or stream', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {});

    const params = { Bucket: 'ncbucketcr', Key: 'key', Body: 'ncunittest' };
    s3
      .upload(params)
      .then((data) => {
        console.log(data);
      });
  });
});
