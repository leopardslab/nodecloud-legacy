# NodeCloud database - AWS RDS

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
const rds = ncAWS.rdbms(options);
```

### Create DB instance

```js
const params = {
  DBInstanceClass: 'db.t1.micro',
  DBInstanceIdentifier: 'nodecloud',
  Engine: 'mysql',
  MasterUserPassword: 'supersecret',
  AllocatedStorage: 5,
  MasterUsername: 'rajika',
};

rds.createDBInstance(params)
  .then((res) => {
    console.log(res);
  });
  .catch((err) => {
    console.error(err);
  });
```

### Create Security group

```js
const params = {
  DBSecurityGroupDescription: 'From NodeCloud API',
  DBSecurityGroupName: 'mysecuritygroup',
  Tags: [
    {
      Key: 'sample',
      Value: 'value',
    },
  ],
};

rds.createDBSecurityGroup(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Create DB Snapshot

```js
const params = {
  DBInstanceIdentifier: 'nodecloud',
  DBSnapshotIdentifier: 'nodecloud-sp2',
};

rds.createDBSnapshot(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Modify DB instance

```js
const params = {
  DBInstanceIdentifier: 'nodecloud',
  NewDBInstanceIdentifier: 'ncrd',
};

rds.modifyDBInstance(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Modify DB snapshot

```js
const params = {
  DBSnapshotIdentifier: 'nodecloud',
  EngineVersion: '5.5.0'
};

rds.modifyDBSnapshot(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
```

### Reboot DB instance

```js
const params = {
  DBInstanceIdentifier: 'nodecloud',
};

rds.rebootDBInstance(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete DB security group

```js
const params = {
  DBSecurityGroupName: 'mysecuritygroup',
};

rds.deleteDBSecurityGroup(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete DB snapshot

```js
const params = {
  DBSnapshotIdentifier: 'nodecloud-sp2',
};

rds.deleteDBSnapshot(params)
  .then((res) => {
    conosle.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### Delete DB instance

```js
const params = {
  DBInstanceIdentifier: 'nodecloud',
  FinalDBSnapshotIdentifier: 'nodecloud',
};

rds.deleteDBInstance(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
