# NodeCloud Peering (network) - AWS Direct Connect

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

### Create connection

```js
const options = {
  apiVersion: "2016-11-15"
};

const awsDc = ncAWS.peering(options);

const params = {
  bandwidth: 'STRING_VALUE',
  connectionName: 'STRING_VALUE',
  location: 'STRING_VALUE',
  lagId: 'STRING_VALUE'
};

// create connection
awsDc
  .createConnection(params)
  .then(res => {
    console.log(`Connection created ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Describe connection

```js
const params = {
  connectionId: 'STRING_VALUE'
};

// describe connection
awsDc
  .describeConnections(params)
  .then(res => {
    console.log(`Describe connection ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Delete connection

```js
const params = {
  connectionId: 'STRING_VALUE'
};

// delete connection
awsDc
  .deleteConnection(params)
  .then(res => {
    console.log(`Delete connection ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Create lag

```js
const params = {
  connectionsBandwidth: 'STRING_VALUE',
  lagName: 'STRING_VALUE',
  location: 'STRING_VALUE',
  numberOfConnections: 0,
  connectionId: 'STRING_VALUE'
};

// create lags
awsDc
  .createLag(params)
  .then(res => {
    console.log(`Create lag ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Describe lags

```js
const params = {
  LoadBalancerNames: ["my-load-balancer"],
  Tags: [
    {
      Key: "project"
    }
  ]
};

// describe lags
awsDc
  .describeLags(params)
  .then(res => {
    console.log(`Describe lags ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Delete lag

```js
const params = {
  lagId: 'STRING_VALUE'
};

// delete lags
awsDc
  .deleteLag(params)
  .then(res => {
    console.log(`Delete lag ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Tag resource

```js
const params = {
  resourceArn: 'STRING_VALUE',
  tags: [
    {
      key: 'STRING_VALUE',
      value: 'STRING_VALUE'
    },
  ]
};

// tag resource
awsDc
  .tagResource(params)
  .then(res => {
    console.log(`Tag resource ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Untag resource

```js
const params = {
  resourceArn: 'STRING_VALUE',
  tagKeys: [
    'STRING_VALUE',
  ]
};

// untag resournce
awsDc
  .untagResource(params)
  .then(res => {
    console.log(`Untag resource ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```
