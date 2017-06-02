# NodeCloud compute - Google (Google Cloud Platform / GCP)

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

### Create instance

```js
gceCompute
  .create({
    zone: "us-central1-a",
    os: "ubuntu",
    name: "ubuntu-http"
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

### List instances

```js
gceCompute.list({
      maxResults: 1
    })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

```

### Stop instance

```js
gceCompute.stop({
      zone: 'us-central1-a',
      vmName: 'ubuntu-http'
    })
  .then(res => {
    const operation = res[0];
    const apiResponse = res[1];
    console.log(operation);
    // console.log(apiResponse)
  })
  .catch(err => {
    console.log(err);
  });
```

### Start instance

```js
gceCompute.start({
      zone: 'us-central1-a',
      vmName: 'ubuntu-http'
    })
  .then(res => {
    const operation = res[0];
    const apiResponse = res[1];
    console.log(operation);
    // console.log(apiResponse)
  })
  .catch(err => {
    console.log(err);
  });
```

### Reboot instance

```js
gceCompute.reboot({
      zone: 'us-central1-a',
      vmName: 'ubuntu-http'
    })
  .then(res => {
    const operation = res[0];
    const apiResponse = res[1];
    console.log(operation);
  })
  .catch(err => {
    console.log(err);
  });
```

### Destroy instance

```js
gceCompute.destroy({
      zone: 'us-central1-a',
      vmName: 'ubuntu-http'
    })
  .then(res => {
    const operation = res[0];
    const apiResponse = res[1];
    console.log(operation);
  })
  .catch(err => {
    console.log(err);
  });

```
