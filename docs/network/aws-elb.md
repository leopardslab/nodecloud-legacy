# NodeCloud Load balancer (network) - AWS ELB

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

### Create load balancer

```js
const options = {
  apiVersion: "2016-11-15"
};

const elb = ncAWS.loadbalancer(options);

const params = {
  Listeners: [
    {
      InstancePort: 80,
      InstanceProtocol: "HTTP",
      LoadBalancerPort: 80,
      Protocol: "HTTP"
    }
  ],
  LoadBalancerName: "my-load-balancer",
  SecurityGroups: ["sg-a61988c3"],
  Subnets: ["subnet-15aaab61"]
};

// create AWS ELB (loadbalancer)
elb
  .create(params)
  .then(res => {
    console.log(`Load balancer created ! ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Remove load balancer

```js
const params = {
  LoadBalancerName: "my-load-balancer",
  LoadBalancerPorts: [80]
};

// remove AWS ELB (loadbalancer)
elb
  .delete(params)
  .then(res => {
    console.log(`Load balancer deleted ! ${res}`);
  })
  .catch(err => {
    conso
```

### List loadbalancers

```js
const params = {
  LoadBalancerNames: ["my-load-balancer"]
};

// list load balancers
elb
  .list(params)
  .then(res => {
    console.log(`Load balancers ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Add tags

```js
const params = {
  LoadBalancerNames: ["my-load-balancer"],
  Tags: [
    {
      Key: "project",
      Value: "lima"
    },
    {
      Key: "department",
      Value: "digital-media"
    }
  ]
};

// add tags to load balancers
elb
  .addTags(params)
  .then(res => {
    console.log(`Tag added to load balancer ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```

### Remove tags

```js
const params = {
  LoadBalancerNames: ["my-load-balancer"],
  Tags: [
    {
      Key: "project"
    }
  ]
};

// remove tags to load balancers
elb
  .removeTags(params)
  .then(res => {
    console.log(`Tags removed from Load balancers ${res}`);
  })
  .catch(err => {
    console.error(`Oops something happened ${err}`);
  });
```
