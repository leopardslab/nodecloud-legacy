# NodeCloud storage - AWS

## Configure AWS credentials

Create `config.json` as follows,

```js
{
  "aws_access_key_id": "xxxxxxxxxxxx",
  "aws_secret_access_key": "xxxxxxxxxxxx",
  "region": "xxxxxxxxx" // eg : us-west-2
}
```

## Initialize library

```js
const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider(
  "AWS",
  process.env.ncconf // path to config.json
);
```

```js
// get compute object for AWS
const s3 = ncAWS.s3(options);
```

### Create S3 Bucket

```js
const params = {
  Bucket: "ncbucketcr",
  CreateBucketConfiguration: {
    LocationConstraint: "us-west-2",
  },
};

s3
  .create(params)
  .then(res => {
    console.log(`Bucket created ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Delete S3 Bucket

```js
const params = {
  Bucket: "ncbucketcr"
};

s3
  .delete(params)
  .then(res => {
    console.log(`Bucket deleted ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Create multipart upload

```js
const params = {
  Bucket: "ncbucketcr",
  Key: "largeobject"
};

s3
  .createMultipartUpload(params)
  .then(res => {
    console.log(`Upload completed ! ${res}`);
    console.error(res);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### List buckets

```js
s3
  .list({})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Uploads an arbitrarily sized buffer, blob, or stream

```js
const params = { Bucket: "ncbucketcr", Key: "key", Body: "adasd" };
s3
  .upload(params)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```
