const nodeCloud = require('../../lib/');
const ncGoogle = nodeCloud.getProvider('google', {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME,
});
// get DNS object for Google
const gceDNS = ncGoogle.dns();

### Create zone

```js
const params = {
  zoneName: 'my-awesome-zone',
  config: {
    dnsName: 'example.com.', // note the period at the end of the domain.
    description: 'This zone is awesome!',
  },
};

gceDNS.createZone()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete zone

```js
const params = {
  zoneId: 'zone-id',
  force: true // optional param API docs [https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.56.0/dns/zone?method=delete]
}

gceDNS.deleteZone(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### List zones

```js
gceDNS.listZones(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Change record sets

```js
// create change
const params = {
  action: 'CREATE',
  record: 'a',
  data: {
    name: 'example.com.',
    data: '1.2.3.4',
    ttl: 86400
  }
}

gceDNS.changeRecordSets(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

```js
// delete change
const paramsOldRecord = {
  name: 'a',
  data: {
    name: 'example.com.',
    data: '1.2.3.4',
    ttl: 86400
  }
}

const paramsNewRecord = {
  name: 'a',
  data: {
    name: 'example.com.',
    data: '15.6.7.8',
    ttl: 86400
  }
}

const oldRecord = gceDNS.record(paramsOldRecord);
const newRecord = gceDNS.record(paramsNewRecord);

const params = {
  action: 'DELETE',
  record: {
    add: newRecord,
    delete: oldRecord
  }
}

gceDNS.changeRecordSets(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
```
