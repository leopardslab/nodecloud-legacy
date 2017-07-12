# NodeCloud DNS (network) - AWS Route53

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

### Create zone

```js
// get dns object for AWS
const route53 = ncAWS.dns(options);

const params = {
  CallerReference: 'STRING_VALUE',
  Name: 'STRING_VALUE',
  DelegationSetId: 'STRING_VALUE',
  VPC: {
    VPCRegion: 'us-east-1',
  },
};

route53
  .createZone(params)
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
  Id: 'STRING_VALUE'
};

route53
  .deleteZone(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### List zones

```js
const params = {
  DelegationSetId: 'STRING_VALUE',
  Marker: 'STRING_VALUE',
  MaxItems: 'STRING_VALUE'
};

route53
  .listZones(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Change record sets

```
const params = {
  ChangeBatch: {
    Changes: [
      {
        Action: "CREATE",
          ResourceRecordSet: {
          Name: "example.com",
          ResourceRecords: [
            {
              Value: "192.0.2.44"
            }
          ],
          TTL: 60,
          Type: "A"
        }
      }
    ],
    Comment: "Web server for example.com"
  },
  HostedZoneId: "Z3M3LMPEXAMPLE"
};

route53
  .changeRecordSets(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
