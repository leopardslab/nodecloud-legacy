# NodeCloud

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/nodecloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a7d5904eead949aab423885f8c58287f)](https://www.codacy.com/app/ScoreLab/nodecloud?utm_source=github.com&utm_medium=referral&utm_content=scorelab/nodecloud&utm_campaign=badger)
[![Build Status](https://travis-ci.org/scorelab/nodecloud.svg?branch=master)](https://travis-ci.org/scorelab/nodecloud)

NodeCloud is a standard library to get a single API among common cloud service providers (Ex. AWS, GCP, Azure.. ).
This will make building products among multiple cloud services and its services easier for the developer.

## Service Types

**Compute** _allows you to manage cloud and virtual servers_

**Object Storage** _allows you to manage cloud object storage_

**Container** _allows users to install and deploy containers onto container based virtualization platforms_

**DNS** _allows you to manage DNS as A Service_

**Backup** _allows you to manage Backup as A Service_

----
## Service Providers

### AWS

- EC2 (Compute)
- S3 Storage (Object Storage)
- Amazon Elastic Container Service (Container)
- Route53 (DNS)
- Amazon EBS Backup Driver (Backup)
----

## Install

> WIP

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
