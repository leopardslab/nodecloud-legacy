const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);

const options = {
  apiVersion: '2015-03-31',
};

const lambda = ncAWS.lambda(options)

const functionParams = {
    Code: {
      S3Bucket: 'nodecloud-test',
      S3Key: 'test-function.zip',
    },
    FunctionName: 'nodecloud-test-function',
    Handler: 'test-function.handler',
    Runtime: 'nodejs6.10',
    Role: 'arn:aws:iam::201418792138:role/nodecloud-test-role'
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
