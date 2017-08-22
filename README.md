# NodeCloud

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/nodecloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a7d5904eead949aab423885f8c58287f)](https://www.codacy.com/app/ScoreLab/nodecloud?utm_source=github.com&utm_medium=referral&utm_content=scorelab/nodecloud&utm_campaign=badger)
[![Build Status](https://travis-ci.org/scorelab/nodecloud.svg?branch=master)](https://travis-ci.org/scorelab/nodecloud)

NodeCloud is a standard library to get a single API among common cloud service providers (Ex. AWS, GCP, Azure.. ).
This will make building products among multiple cloud services and its services easier for the developer.

## Install

```
npm install nodecloud
       or
yarn add nodecloud
```

## Service Providers

- Amazon web services (AWS)
- Google cloud platform (GCP)

## Service Types

| Service Category | Service | AWS | GCP |
| --- | --- | --- | --- |
| Compute | IaaS | EC2 | Compute Engine |
|         | Containers | ECS | - |
| Storage | Object Storage | S3 | Cloud Storage |
|         | Block Storage  | EBS | Persistent Disks |
| Networking | Load Balancer | ELB | - |
|            | Peering | Direct Connect | - |
|            | DNS | Route53 | Google DNS |
| Databases | RDBMS | RDS | - |
|           | NoSQL: key-value | DynamoDB | Cloud Datastore |
|           | NoSQL: indexed | - | Cloud Datastore |

## Usage

```js
const nodeCloud = require("nodecloud");
// AWS
const ncAWS = nodeCloud.getProvider("AWS");
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
  .createInstance(params, instanceParams)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
```

## Development setup

```
$ git clone https://github.com/scorelab/nodecloud
$ cd nodecloud
$ yarn install
```

### Run unit tests

```
$ yarn test
```
