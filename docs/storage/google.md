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

