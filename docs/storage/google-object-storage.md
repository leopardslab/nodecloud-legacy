# NodeCloud Storage - Object storage - Google (Google Cloud Platform / GCP)

## Configure GCP credentials

- Download `keyFile` from `GCP` console
- Set environment variables

```
GCLOUD_PROJECT='nodecloud-demo',
GCLOUD_KEY_FILE_NAME='xxxxxxxxxxx'
```

## Initialize library

```js
const nodeCloud = require("nodecloud");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
const gcsBucket = ncGoogle.bucket({ bucketName: 'new-bucket-nodecloud' });
```

### Create Bucket

```js
gcsBucket
  .create({
    bucketName: 'new-bucket-nodecloud',
    metaData: {
      location: 'US-CENTRAL1',
      regional: true,
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### List Buckets

```js
gcsBucket.list()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
```

### Upload

```js
gcsBucket
  .upload({ contentPath: '/home/rajika/Downloads/17157378_1300287706716648_1340895893892375918_o.jpg' })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Delete Bucket

```js
gcsBucket
  .delete()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```
