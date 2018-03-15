const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);

const options = {
  apiVersion: '2015-03-31',
};

const lambda = ncAWS.functions(options)

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

const functionInvokeDeleteParams = {
  FunctionName: 'nodecloud-test-function',
};

lambda.createFunction(functionParams)
      .then((res) => {
        console.log(res);
        return lambda.invokeFunction(functionInvokeDeleteParams);
      })
      .then((res) => {
        console.log(res);
        return lambda.listFunctions({});
      })
      .then((res) => {
        console.log(res);
        return lambda.deleteFunction(functionInvokeDeleteParams);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
