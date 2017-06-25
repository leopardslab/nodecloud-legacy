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

### Create image

```js
const params = {
  InstanceId: 'STRING_VALUE', /* required */
  Name: 'STRING_VALUE', /* required */
  BlockDeviceMappings: [
    {
      DeviceName: 'STRING_VALUE',
      Ebs: {
        DeleteOnTermination: true || false,
        Encrypted: true || false,
        Iops: 0,
        SnapshotId: 'STRING_VALUE',
        VolumeSize: 0,
        VolumeType: standard | io1 | gp2 | sc1 | st1
      },
      NoDevice: 'STRING_VALUE',
      VirtualName: 'STRING_VALUE'
    },
    /* more items */
  ],
  Description: 'STRING_VALUE',
  DryRun: true || false,
  NoReboot: true || false
};

ebs
  .create(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Create snapshot

```js
const params = {
  Description: "This is my root volume snapshot.",
  VolumeId: "vol-1234567890abcdef0"
};

ebs
  .createSnapshot(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Delete snapshot

```js
const params = {
  SnapshotId: "snap-1234567890abcdef0"
};

ebs
  .deleteSnapshot(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

const params = {
  SnapshotId: 'STRING_VALUE', /* required */
  DryRun: true || false
};

ebs
  .deleteSnapshot(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });

```

### Describe snapshot

```js
const params = {
  SnapshotIds: [
     "snap-1234567890abcdef0"
  ]
};

ebs
  .describeSnapshots(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Describe volume

```js
const params = {
  Attribute: "autoEnableIO",
  VolumeId: "vol-049df61146c4d7901"
};

ebs
  .describeVolume(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Describe volumes

```js
const params = {};

ebs
  .describeVolumes(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```
