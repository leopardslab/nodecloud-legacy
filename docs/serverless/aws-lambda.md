# NodeCloud Serverless - AWS

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

### Create a lambda function

```js
const options = {
  apiVersion: '2015-03-31',
};

const functions = ncAWS.functions(options)

const functionParams = {
    Code: {
      S3Bucket: 'nodecloud-test', // This bucket should exist
      S3Key: 'test-function.zip', // This zip file should be present in the bucket
    },
    FunctionName: 'nodecloud-test-function',
    Handler: 'test-function.handler',
    Runtime: 'nodejs6.10',
    Role: 'arn:aws:iam::1234567891:role/nodecloud-test-role' // Replace with actual Role
};

functions
  .createFunction(functionParams)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete a lambda function

```js
const functionDeleteParams = {
  FunctionName: 'nodecloud-test-function',
};

fuctions
  .deleteFunction(functionDeleteParams)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### List all lambda functions

```js
functions
  .listFunctions({}) // no params since this will list all functions
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Invoke a lambda function

Useful for local testing

```js
const functionInvokeParams = {
  FunctionName: 'nodecloud-test-function',
};

functions
  .invokeFunction(functionInvokeParams)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
