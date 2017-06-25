# NodeCloud compute - disk - Google (Google Cloud Platform / GCP)

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
const gceCompute = ncGoogle.compute();
```

### Create disk

```js
const config = {
  os: 'ubuntu',
  sizeGb: 10
};

gceCompute
  .create({
    name: "new-disk"
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Delete disk

```js
gceCompute
  .delete()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Get disk

```js
gceCompute
  .get()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Describe disk

```js
gceCompute
  .describe()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Create Snapshot

```js
const params = {
  snapshotName: 'disk-snapshot-name'
};

gceCompute
  .createSnapshot(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Delete Snapshot

```js
gceCompute
  .delete()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Describe snapshot

```js
gceCompute
  .describeSnapshot()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Check snapshot exists

```js
gceCompute
  .existsSnapshot()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
