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

describe('AWS S3', () => {
  before(() => {});

  it('should create S3 bucket', (done) => {
    nock('https://ncbucketcr.s3-us-west-2.amazonaws.com/')
      .filteringPath(() => '/')
      .put(
        '/',
        '<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><LocationConstraint>us-west-2</LocationConstraint></CreateBucketConfiguration>',
      )
      .reply(200, { Location: 'http://ncbucketcr.s3.amazonaws.com/' });

    const params = {
      Bucket: 'ncbucketcr',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-west-2',
      },
    };

    s3.create(params).then((res) => {
      assert.equal(res.Location, `https.${params.Bucket}.s3.amazonaws.com`);
      done();
    });
  });

  it('should not delete S3 bucket', (done) => {
    nock('https://ncbucketcr.s3-us-west-2.amazonaws.com/')
      .put('/')
      .reply(200, 'BucketNotEmpty: The bucket you tried to delete is not empty');

    const params = {
      Bucket: 'ncbucketcr',
    };

    s3.delete(params).then((res) => {
      assert.equal(res, 'BucketNotEmpty: The bucket you tried to delete is not empty');
    });
  });

  it('should create multipart upload', (done) => {
    nock('https://ncbucketcr.s3-us-west-2.amazonaws.com').post('/').reply(200, {
      Bucket: 'ncbucketcr',
      Key: 'largeobject',
      UploadId: 'r9wH_BGuKu',
    });

    const params = {
      Bucket: 'ncbucketcr',
      Key: 'largeobject',
    };

    s3.createMultipartUpload(params).then((res) => {
      assert.equal(res.Bucket, 'ncbucketcr');
      assert.equal(res.Key, 'largeobject');
      assert.typeOf(typeof res.UploadId, 'string');
    });
  });

  it('should list all buckets', (done) => {
    nock('https://ncbucketcr.s3-us-west-2.amazonaws.com/')
      .post('/')
      .reply(200, {
        Buckets: [
          {
            Name: 'aws-nodejs-dev-serverlessdeploymentbucket-1kj4pxn2sq697',
            CreationDate: '2017-03-18T08:41:21.000Z',
          },
          { Name: 'ncbucket', CreationDate: '2017-06-23T07:28:40.000Z' },
          { Name: 'ncbucketcr', CreationDate: '2017-06-24T16:59:15.000Z' },
        ],
        Owner: {
          DisplayName: 'rajika.imal',
          ID: 'dc9324a77',
        },
      });

    s3.list({}).then((res) => {
      assert.typeOf(res.Buckets, 'array');
      assert.equal(res.Buckets[0].Name, 'ncbucket');
    });
  });

  it('should upload an arbitary sized buffer, blob, or stream', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com').post('/').reply(200, {
      ETag: '"922ec9531b1f94add983a8ce2ebdc97b"',
      Location: 'https://ncbucketcr12.s3-us-west-2.amazonaws.com/key',
      key: 'key',
      Key: 'key',
      Bucket: 'ncbucketcr',
    });

    const params = { Bucket: 'ncbucketcr', Key: 'key', Body: 'ncunittest' };

    s3.upload(params).then((res) => {
      assert.typeOf(res.Etag, 'string');
      assert.equal(res.Location, `https.${params.Bucket}.s3.amazonaws.com`);
      assert.equal(res.Bucket, params.Bucket);
    });
  });
});
