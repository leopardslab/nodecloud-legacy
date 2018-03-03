# NodeCloud Security - AWS

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

### Create IAM group

```js
const options = {
  apiVersion: "2016-11-15"
};

const params = {
  GroupName: "nodeCloudTest"
};

const iam = ncAWS.iam(options)

iam
  .createGroup(params)
  .then(res => {
    console.log(`All done! ${res}`);
  })
  .catch(err => {
    console.error(err);
  });
```

### Delete IAM Group

```js
const params = {
  GroupName: "nodeCloudTest"
};

iam
  .deleteGroup(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Attach a policy to a group

```js
const GroupPolicyParams = {
	GroupName: "nodeCloudTest",
	PolicyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess" // this can be any policy
};

iam
  .attachGroupPolicy(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### Detach a policy from a group

```js
const GroupPolicyParams = {
	GroupName: "nodeCloudTest",
	PolicyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess" // this can be any policy
};

iam
  .detachGroupPolicy(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
