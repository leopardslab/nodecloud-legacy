const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider("AWS", process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};

// get compute object for AWS
const ebs = ncAWS.storage(options);

const params = {
  InstanceId: 'STRING_VALUE', /* required */
  Name: 'STRING_VALUE', /* required */
  BlockDeviceMappings: [
    {
      DeviceName: 'STRING_VALUE',
      Ebs: {
        DeleteOnTermination: true || false,
        Encrypted: true || false,
        Iops: 0,
        SnapshotId: 'STRING_VALUE',
        VolumeSize: 0,
        VolumeType: standard | io1 | gp2 | sc1 | st1
      },
      NoDevice: 'STRING_VALUE',
      VirtualName: 'STRING_VALUE'
    },
    /* more items */
  ],
  Description: 'STRING_VALUE',
  DryRun: true || false,
  NoReboot: true || false
};

console.log('creating ebs image');
// create AWS ESB image
ebs
  .create(params)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
