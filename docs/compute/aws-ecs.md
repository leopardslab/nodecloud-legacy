# NodeCloud container - AWS ECS

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
const ecs = ncAWS.container(options);
```

### Describe clusters

```js
const params = {
  clusters: [
    'default',
  ],
};

ecs.describeClusters(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Describe ECS services

```js
const params = {
  services: [
    'sample-webapp',
  ],
};

ecs.desribeServices(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Describe ECS container instances

```js
const params = {
  cluster: 'default',
  containerInstances: [
    'ab0262b7-1b12-4485-8f6f-79166e4d5230',
  ],
};

ecs.describeContainerInstances(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Create ECS service

```js
const params = {
  desiredCount: 1,
  serviceName: 'ecs-simple-service',
  taskDefinition: 'console-sample-app-static:1',
};

ecs.createService(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete ECS service

```js
const params = {
  service: 'ecs-simple-service',
};

ecs.deleteService(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Create ECS cluster

```js
const params = {
  clusterName: 'my_cluster',
};

ecs.createCluster(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete ECS cluster

```js
const params = {
  cluster: 'my_cluster',
};

ecs.deleteCluster(params)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err);
  });
```
