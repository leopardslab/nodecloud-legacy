# NodeCloud database - AWS DynamoDB

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
const options = {
  apiVersion: '2016-11-15',
};
const dynamoDB = ncAWS.nosql(options);
```

### Create an item

```js
const params = {
  Item: {
    artist: {
      S: 'GG',
    },
  },
  ReturnConsumedCapacity: 'TOTAL',
  TableName: 'Test',
};

dynamoDB.createItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete an item

```js
const params = {
  Key: {
    artist: {
      S: 'Taylor swift',
    },
  },
  TableName: 'Test',
};

dynamoDB.deleteItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
```

### Update an item

```js
const params = {
  ExpressionAttributeNames: {
    '#Y': 'Year',
  },
  ExpressionAttributeValues: {
    ':y': {
      N: '2015',
    },
  },
  Key: {
    artist: {
      S: 'Taylor Swift',
    },
  },
  ReturnValues: 'ALL_NEW',
  TableName: 'Test',
  UpdateExpression: 'SET #Y = :y',
};

dynamoDB.updateItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
```

### Query

```js
const params = {
  ExpressionAttributeValues: {
    ':v1': {
      S: 'Taylor Swift',
    },
  },
  KeyConditionExpression: 'artist = :v1',
  TableName: 'Test',
};

dynamoDB.query(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
```
