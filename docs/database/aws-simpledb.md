# NodeCloud database - AWS SimpleDB

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
const simpleDB = ncAWS.indexedDB(options);
```

### Create a domain

```js
const params = {
  DomainName: 'nodeCloudTestDomain' /* required */
};

simpleDB.createDomain(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete a domain

```js
simpleDB.deleteDomain(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Create an Item
```js
const params = {
  Attributes: [ /* required */
    {
      Name: 'STRING_VALUE', /* required */
      Value: 'STRING_VALUE', /* required */
      Replace: true || false
    },
    /* more items */
  ],
  DomainName: 'STRING_VALUE', /* required */
  ItemName: 'STRING_VALUE', /* required */
  Expected: {
    Exists: true || false,
    Name: 'STRING_VALUE',
    Value: 'STRING_VALUE'
  }
};

simpleDB.createItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete an Item
```js
simpleDB.deleteItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Update an Item
```js
simpleDB.updateItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Query an Item
```js
const params = {
  SelectExpression: 'STRING_VALUE', /* required */
  ConsistentRead: true || false,
  NextToken: 'STRING_VALUE'
};
simpleDB.query(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
