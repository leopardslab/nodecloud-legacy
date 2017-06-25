const nodeCloud = require('../../lib/');
const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const params = {
  ImageId: 'ami-10fd7020',
  InstanceType: 't1.micro',
  MinCount: 1,
  MaxCount: 1,
};

const instanceParams = {
  Key: 'Name',
  Value: 'Node Cloud demo',
};

// get compute object for AWS
const ec2 = ncAWS.compute(options);

// create AWS EC2 instance
ec2
  .create(params, instanceParams)
  .then((res) => {
    console.log(`All done ! ${res}`);
  })
  .catch((err) => {
    console.log(`Oops something happened ${err}`);
  });
