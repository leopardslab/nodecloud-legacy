const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncGoogle = nodeCloud.getProvider('google', {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME,
});

const gcsBucket = ncGoogle.bucket({ bucketName: 'ncbucketcr' });

describe('Google/GCP object storage', () => {
  before(() => {});

  it('should create bucket', (done) => {
    nock('https://www.googleapis.com/storage/v1/b/')
      .post('/')
      .reply(200, { Bucket: { Id: 'axDdx3sds' } });

    const gcsBucketToCreate = ncGoogle.bucket();

    const params = {
      bucketName: 'ncbucketcr',
      metaData: {
        location: 'US-CENTRAL1',
        regional: true,
      },
    };

    gcsBucketToCreate.create(params).then((res) => {
      assert.equal(res.Bucket.Id, 'ncbucketcr');
    });
  });

  it('should delete bucket', (done) => {
    nock('https://www.googleapis.com/storage/v1/b/ncbucketcr/')
      .delete('/')
      .reply(200, {});

    const gcsBucketToDelete = ncGoogle.bucket({ bucketName: 'ncbucketcr' });

    const params = {
      Bucket: 'ncbucketcr',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-west-2',
      },
    };

    gcsBucketToDelete
      .delete()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should list buckets', (done) => {
    nock('https://www.googleapis.com/storage/v1/b/').delete('/').reply(200, [
      {
        metadata: [Object],
        baseUrl: '/b',
      },
      {
        metadata: [Object],
        baseUrl: '/b',
      },
    ]);

    gcsBucket.list().then((res) => {
      assert.typeOf(res, 'array');
    });
  });

  it('should upload to bucket', (done) => {
    nock('https://www.googleapis.com/storage/v1/b/ncbucketcr/o')
      .delete('/')
      .reply(200, [{ bucket: { metaData: {}, baseUrl: '/b' } }]);

    gcsBucket.upload({ contentPath: [1, 2, 3] }).then((res) => {
      assert.typeOf(res, 'array');
      assert.equal(res[0].bucket.metaData, {});
    });
  });
});
