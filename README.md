# NodeCloud
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
const nodeCloud = require('nodecloud');
const config = require('./config');

// AWS
const ncAWS = nodeCloud.getProvider('aws');
const awsStorage = ncAWS({ key: config.aws.S3, service: 'S3' });

awsStorage.createStorage({ Bucket: 'MyBucket', Body: 'Hello !' })
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
