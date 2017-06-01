# NodeCloud compute

## Configure AWS Credentials

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

### Create instance

```jsjsjs
const options = {
  apiVersion: "2016-11-15"
};

const params = {
  ImageId: "ami-10fd7020", // amzn-ami-2011.09.1.x86_64-ebs
  InstanceType: "t1.micro",
  MinCount: 1,
  MaxCount: 1
};
const instanceParams = {
  Key: "Name",
  Value: "Node Cloud demo"
};

const ec2 = ncAWS.compute(options);

ec2
  .create(params, instanceParams)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
```

### List instances

```jsjs
const params = {
  DryRun: false
};

ec2.
  list(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

### Stop instance

```js
const params = {
  InstanceIds: ["i-0e8463a71076e3d5f"],
  DryRun: false
};

ec2
  .stop(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

### Start instance

```js
ec2
  .start(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

### Reboot instance

```jsjs
ec2
  .reboot(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

### Destroy instance

```js
ec2
  .destroy(params)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

```
